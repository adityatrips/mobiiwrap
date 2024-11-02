"use client";

import React from "react";

const LoginModalContext = React.createContext({
  isLoginOpen: false,
  setIsLoginOpen: (value) => {},
});

const LoginModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  return (
    <LoginModalContext.Provider value={{ isLoginOpen, setIsLoginOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => React.useContext(LoginModalContext);

export default LoginModalProvider;
