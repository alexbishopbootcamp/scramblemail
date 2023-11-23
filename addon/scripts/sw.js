const GRAPHQL_URL = 'https://scramble.email/graphql';

// TODO: Currently all in the one script. Look into splitting into multiple scripts

// Authentication
const Auth = {
  getAccessToken: function () {
    return Store.get('accessToken');
  },
  setAccessToken: function (token) {
    Store.set('accessToken', token);
  },
  removeAccessToken: function () {
    Store.remove('accessToken');
  },
  // TODO: Determine if a library can be used to decode the token
  decodeToken: function(token) {
    try{
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  
  isTokenExpired: function (token) {
    if (!token) {
      return true;
    }
    const decodedToken = Auth.decodeToken(token);
    if(!decodedToken){
      return true;
    }
    return Date.now() >= decodedToken.exp * 1000;
  },
  isAuthenticated: async function () {
    const token = await Auth.getAccessToken();
    return token && !Auth.isTokenExpired(token);
  },
  refreshToken: async function () {
    const payload = await GraphQL.mutate(GraphQL.REFRESH_TOKEN)
    Auth.setAccessToken(payload.data.refreshToken.accesstoken);
  }
}

// Store
const Store = {
  get: function(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key]);
      });
    });
  },
  set: function(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({[key]: value}, () => {
        resolve();
      });
    });
  },
}

const GraphQL = {
  REFRESH_TOKEN: `
    mutation refreshToken {
      refreshToken {
        success
        message
        accesstoken
      }
    }
  `,
  GENERATE_ADDRESS: `
    mutation generateAddress {
      generateAddress {
        email
      }
    }
  `,
  mutate: async function(mutation) {
    return fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (await Auth.getAccessToken()),
      },
      body: JSON.stringify({
        query: mutation,
      }),
    })
    .then(response => response.json())
    .then(data => {
      return(data);
    })
  }
  
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateEmail",
    title: "Generate Email",
    contexts: ["editable"], // Show in context menus for text edit fields
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "generateEmail") {

    // Refresh token if needed
    const isAuthenticated = await Auth.isAuthenticated();


    if(!isAuthenticated){
      await Auth.refreshToken();
    }

    // Generate address
    const payload = await GraphQL.mutate(GraphQL.GENERATE_ADDRESS);
    const address = payload.data.generateAddress.email;

    chrome.tabs.sendMessage(tab.id, {
      action: "generateEmail",
      frameId: info.frameId,
      selectionText: info.selectionText,
      generatedAddress: address
    });
  }
});
