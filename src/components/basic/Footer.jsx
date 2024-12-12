import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";

const Footer = ({ children }) => {
  const { resetTodo } = useContext(TodoContext);
  return (
    <div>
      <button onClick={() => resetTodo()}>투두 초기화</button>
      {children}
    </div>
  );
};
export default Footer;
