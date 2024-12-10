import { useContext, useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const TodoList = () => {
  const { todoList } = useContext(TodoContext);
  const navigate = useNavigate();

  const handleClickadd = () => {
    navigate(`/todo/add`);
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        {todoList.map(item => {
          return (
            <li key={item.id}>
              <TodoItem item={item} />
            </li>
          );
        })}
      </div>
      <div>
        <button onClick={() => handleClickadd()}>추가하기</button>
      </div>
    </div>
  );
};
export default TodoList;
