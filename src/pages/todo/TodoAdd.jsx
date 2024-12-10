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

const TodoAdd = () => {
  const { addTodo } = useContext(TodoContext);
  //Params로 id 추출
  //useEffect에서 id를 이용해서 할 일 출력하시오.
  //useState 화면 리랜더링
  const [formData, setFormData] = useState(initData);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
    addTodo(formData);
    alert("내용이 추가되었습니다.");
    navigate(`/todo`);
  };

  const handleClickBack = () => {
    navigate(`/todo`);
  };

  return (
    <div>
      <h1>TodoAdd</h1>
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
            onChange={e => handleChange(e)}
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
          <button type="submit">추가하기</button>
          <button type="button" onClick={() => handleClickBack()}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default TodoAdd;
