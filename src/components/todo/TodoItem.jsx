import { useContext } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const TodoItem = ({ item }) => {
  // Link: 수정, 삭제, 자세히 보기 버튼
  // 제목, 작성자, 날짜
  // 제목 클릭시 상세페이지 이동
  // 링크는 searchParam을 이용해주세요.
  const { deleteTodo } = useContext(TodoContext);
  return (
    <div>
      <Link to={`/todo/detail?id=${item.id}`}>
        <h4>{item.title}</h4>
      </Link>
      <div>{item.author}</div>
      <div>{item.date}</div>
      <button onClick={() => deleteTodo(item.id)}>삭제</button>
    </div>
  );
};
export default TodoItem;
