import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const THEME_COOKIE = "theme_cookie";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("white");
  const [cookies, setCookie, removeCookie] = useCookies([THEME_COOKIE]);
  const handleChangeTheme = () => {
    const nowTheme = theme === "white" ? "pink" : "white";
    setTheme(nowTheme);
    localStorage.setItem("theme", JSON.stringify(nowTheme));
    setCookie(THEME_COOKIE, nowTheme, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60, // 일*시*분*초 (기간을 초로 입력해야하기 때문에)
    });
  };

  useEffect(() => {
    const nowTheme = localStorage.getItem("theme");
    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
    const flagCookie = cookies[THEME_COOKIE];
    if (flagCookie) {
      setTheme(flagCookie);
    } else {
      setCookie(THEME_COOKIE, "white", {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
