import { useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";

const TodoList = ({ todoList, setTodoList }) => {
  // useEffect를 이용해 할일 목록을 불러오시오.
  // useState를 이용해 목록을 map으로 출력하시오.
  const navigate = useNavigate();
  const deleteTodo = id => {
    // 할일 목록 한개 삭제하기
    alert(`${id} 삭제했습니다.`);
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
  };
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
        {todoList.map((item, index) => {
          return (
            <li key={item.id}>
              <TodoItem item={item} deleteTodo={deleteTodo} />
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
