import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {/* 컴포넌트를 children으로 받는다 */}
      {children}
    </LoginContext.Provider>
  );
};
