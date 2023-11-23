// Very simple listener to insert text into the active input field
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateEmail") {
    let inputField = document.activeElement;
    if (inputField.tagName === "INPUT") {
      inputField.value = request.generatedAddress;
    }
  }
});
