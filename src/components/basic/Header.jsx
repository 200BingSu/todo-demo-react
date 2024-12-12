import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaHeartCircleCheck } from "react-icons/fa6";

const Header = () => {
  const { login, handleCLickLogin } = useContext(LoginContext);
  const { handleChangeTheme } = useContext(ThemeContext);

  return (
    <header>
      <Link to={"/"}>
        <FaHeartCircleCheck style={{ color: "white" }} />
        HOME
      </Link>
      <Link to={"/"}>❓ABOUT</Link>
      <Link to={"/member"}>👍회원가입</Link>
      <Link to={"/todo"}>📄TODO</Link>
      <button onClick={() => handleChangeTheme()}>테마변경</button>
      {login ? (
        <button type="button" onClick={() => handleCLickLogin(false)}>
          로그아웃
        </button>
      ) : (
        <button type="button" onClick={() => handleCLickLogin(true)}>
          로그인
        </button>
      )}
    </header>
  );
};
export default Header;
