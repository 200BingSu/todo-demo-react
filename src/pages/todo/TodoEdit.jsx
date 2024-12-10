import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";
const initData = {
  id: 0,
  title: "",
  content: "",
  author: "",
  date: "",
  complete: 0,
  privacy: 0,
};

const TodoEdit = () => {
  //Params로 id 추출
  //useEffect에서 id를 이용해서 할 일 출력하시오.
  //useState 화면 리랜더링
  const { todoList, updateTodo } = useContext(TodoContext);
  const [formData, setFormData] = useState(initData);

  const { id } = useParams();
  const navigate = useNavigate();

  const getTodo = () => {
    const findData = todoList.filter(item => item.id === parseInt(id));
    const findTodo = findData[0];
    setFormData({ ...findTodo });
  };

  useEffect(() => {
    getTodo();
    return () => {};
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateTodo(formData);
    alert("내용이 수정되었습니다.");
    navigate(`/todo/detail?id=${id}`);
  };

  const handleClickBack = () => {
    navigate(`/todo/detail?id=${id}`);
  };

  return (
    <div>
      <h1>TodoEdit</h1>
      <div>
        /todo/<b>{id}</b>
      </div>
      <form action="" onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="author">작성자</label>
          <input
            name="author"
            id="author"
            type="text"
            value={formData.author}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="title">제목</label>
          <input
            name="title"
            id="title"
            type="text"
            value={formData.title}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            type="text"
            value={formData.content}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="date">날짜</label>
          <input
            name="date"
            id="date"
            type="date"
            value={formData.date}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="complete">상태</label>
          <input
            name="complete"
            id="complete"
            type="checkbox"
            // value={formData.complete}
            checked={formData.complete === 1 ? true : false}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="privacy">공개</label>
          <input
            name="privacy"
            id="privacy"
            type="checkbox"
            // value={formData.privacy}
            checked={formData.privacy === 1 ? true : false}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <button type="submit">수정하기</button>
          <button type="button" onClick={() => handleClickBack()}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default TodoEdit;
