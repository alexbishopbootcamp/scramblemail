import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// TODO: The access token may never be used from the state. If it is only ever used in the
//       apollo middleware, then we can remove the state and just use the global variable.

// Global variable that will be used to store the access token
// This is a workaround for not being able to access the React state outside of a component
let accessToken = null;

export const getAccessToken = () => accessToken;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ accessToken: null });

  const login = (newAccessToken) => {
    accessToken = newAccessToken;
    setAuthState({ accessToken: newAccessToken });
  };

  const logout = () => {
    accessToken = null;
    setAuthState({ accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
