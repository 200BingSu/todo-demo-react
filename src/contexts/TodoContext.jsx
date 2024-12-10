import { createContext, useState } from "react";
import { TODO_MOCK_DATA } from "../constants/mockdata";

// 1. context 생성하기
export const TodoContext = createContext();
//예: 유저 로그인, 언어, 장바구니

//local storage 여러가지 값이 보관되므로 구분할 수 있도록 구분용 key가 필요함
const TODO_LS_KEY = "todos";
// 2.  Context를 활용할 provider 생성
export const TodoProvider = ({ children }) => {
  // 3. 관리하고 싶은 state 및 state를 업데이트 하는 기능을 모아둠
  const [todoList, setTodoList] = useState([...TODO_MOCK_DATA]);
  const [countId, setCountId] = useState(TODO_MOCK_DATA.length + 1);

  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: countId }];
    setTodoList(newTodoData);
    setCountId(countId => countId + 1);
  };
  // Todo 삭제
  const deleteTodo = id => {
    // 할일 목록 한개 삭제하기
    alert(`${id} 삭제했습니다.`);
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
  };
  // Todo 수정
  const updateTodo = formData => {
    console.log("formData", formData);
    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });
    console.log(newTodoData);
    setTodoList(newTodoData);
  };
  //   4. provider의 value에 어ㅜㄴ하는 기능 및 state를 전달해줌.
  return (
    <TodoContext.Provider value={{ todoList, addTodo, deleteTodo, updateTodo }}>
      {/* 컴포넌트를 children으로 받는다 */}
      {children}
    </TodoContext.Provider>
  );
};
