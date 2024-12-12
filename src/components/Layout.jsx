import { useContext } from "react";
import { LoginProvider } from "../contexts/LoginContext";
import Footer from "./basic/Footer";
import Header from "./basic/Header";
import { ThemeContext } from "../contexts/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: `${theme}` }}>
      <LoginProvider>
        <Header />
      </LoginProvider>
      <hr />
      <main>{children}</main>
      <hr />
      <Footer>
        <p>Copyright 2024. By Hong</p>
      </Footer>
    </div>
  );
};
export default Layout;
