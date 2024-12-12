import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const LOGIN_LS_KEY = "logins";
const LOGINS_SESSION_KEY = "logins_session";
export const LOGIN_COOKIE = "logins_cookie";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies([LOGIN_COOKIE]);

  const handleCLickLogin = _boolean => {
    setLogin(!login);
    localStorage.setItem(LOGIN_LS_KEY, JSON.parse(_boolean));
    sessionStorage.setItem(LOGINS_SESSION_KEY, JSON.parse(_boolean));
    setCookie(LOGIN_COOKIE, _boolean, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    const nowlogin = localStorage.getItem(LOGIN_LS_KEY);
    if (nowlogin) {
      setLogin(JSON.parse(nowlogin));
    } else {
      localStorage.setItem("logins", login);
    }
    const flagSession = sessionStorage.getItem(LOGINS_SESSION_KEY);
    if (flagSession) {
      setLogin(JSON.parse(nowlogin));
    } else {
      sessionStorage.setItem("logins", login);
    }
    const flagCookie = cookies[LOGIN_COOKIE];
    if (flagCookie) {
      setLogin(flagCookie);
    } else {
      setCookie(LOGIN_COOKIE, false, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{ login, setLogin, handleCLickLogin, setCookie }}
    >
      {children}
    </LoginContext.Provider>
  );
};
