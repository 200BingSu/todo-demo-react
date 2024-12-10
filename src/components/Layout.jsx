import { LoginProvider } from "../contexts/LoginContext";
import Footer from "./basic/Footer";
import Header from "./basic/Header";

const Layout = ({ children }) => {
  return (
    <div>
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
