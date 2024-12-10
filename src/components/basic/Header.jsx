import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const Header = () => {
  const { login, setLogin } = useContext(LoginContext);
  const handleClickLogin = () => {
    setLogin(!login);
  };
  return (
    <header>
      <Link to={"/"}>🏚Home</Link>
      <Link to={"/"}>❓About</Link>
      <Link to={"/todo"}>📄Todo</Link>
      <button type="button" onClick={() => handleClickLogin()}>
        {login ? "로그아웃" : "로그인"}
      </button>
    </header>
  );
};
export default Header;
