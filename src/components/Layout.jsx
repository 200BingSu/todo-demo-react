import Footer from "./basic/Footer";
import Header from "./basic/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
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
