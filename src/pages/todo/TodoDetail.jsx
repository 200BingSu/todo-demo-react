import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const TodoDetail = () => {
  // SearchParams 이용
  const { todoList } = useContext(TodoContext);
  const [searchParams] = useSearchParams();
  const [todo, setTodo] = useState([]);
  const id = parseInt(searchParams.get("id"));
  const navigate = useNavigate();

  const getTodo = () => {
    const findData = todoList.filter(item => item.id === id);
    const findTodo = findData[0];
    setTodo({ ...findTodo });
  };
  // 자바스크립트로 패스 이동하기
  const handleClickEdit = () => {
    navigate(`/todo/edit/${id}`);
  };

  useEffect(() => {
    getTodo();
    return () => {};
  }, []);

  return (
    <div>
      <div>/todo/detatil?id={id} 할일 목록 </div>
      <h1>TodoDetail</h1>
      <div>{todo.author}</div>
      <div>{todo.date}</div>
      <div>{todo.title}</div>
      <div>{todo.content}</div>
      <div>
        <button onClick={() => handleClickEdit()}>수정하기</button>
        <button onClick={() => navigate("/todo")}>목록보기</button>
      </div>
    </div>
  );
};
export default TodoDetail;
