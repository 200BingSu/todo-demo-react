import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const TodoContext = createContext();

const TODO_LS_KEY = "todos";
const TODO_SESSION_KEY = "todos_session";
const TODO_COOKIE_NAME = "todos_cookie";

export const TodoProvider = ({ children }) => {
  //쿠키 라이브러리 사용
  const [cookies, setCookie, removeCookie] = useCookies([TODO_COOKIE_NAME]);
  const [todoList, setTodoList] = useState([]);

  const addTodo = formData => {
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);

    // 기본 구조 유지: 로컬스토리지에 직접 저장
    localStorage.setItem(TODO_LS_KEY, JSON.stringify(newTodoData));
    // 세션에 임시 저장(웹브라우저 임시 보관)
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(newTodoData));

    // 쿠키에 저장(서버 자료 보관이 아니라서 비추천)
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const deleteTodo = id => {
    alert(`${id} 삭제했습니다.`);
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);

    // 기본 구조 유지: 로컬스토리지에 직접 저장
    localStorage.setItem(TODO_LS_KEY, JSON.stringify(newList));
    // 세션 내용 삭제
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(newList));
    //쿠키에 삭제
    setCookie(TODO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const updateTodo = formData => {
    console.log("formData", formData);
    const newTodoData = todoList.map(item =>
      formData.id === item.id ? formData : item,
    );
    console.log(newTodoData);
    setTodoList(newTodoData);

    // 기본 구조 유지: 로컬스토리지에 직접 저장
    localStorage.setItem(TODO_LS_KEY, JSON.stringify(newTodoData));
    // 세션에 내용 업데이트
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(newTodoData));
    // 쿠키 업데이트
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const resetTodo = () => {
    // 로컬 삭제
    localStorage.clear(TODO_LS_KEY);
    // 세션 삭제

    // 쿠키 삭제
    removeCookie(TODO_COOKIE_NAME);
    setTodoList([]);
  };

  // 초기 렌더링 시 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    //로컬 읽기
    const todos = localStorage.getItem(TODO_LS_KEY);
    // 세션 읽기
    const todoSession = sessionStorage.getItem(TODO_SESSION_KEY);
    //쿠키 읽기
    const todosCookie = cookies[TODO_COOKIE_NAME];
    // 로컬 초기화
    if (todos) {
      const datas = JSON.parse(todos);
      setTodoList(datas);
    } else {
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
    }
    if (todoSession) {
      setTodoList(todosCookie);
    } else {
      sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(todoList));
    }
    if (todosCookie) {
      setTodoList(todosCookie);
    } else {
      setCookie(TODO_COOKIE_NAME, [], {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
  }, []);

  // 추가적인 데이터 저장 로직은 제거 (중복 제거)
  // 기본 구조에 맞게 다른 함수에서 처리

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
