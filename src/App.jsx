import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { TODO_MOCK_DATA } from "./constants/mockdata";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";

let originData = [...TODO_MOCK_DATA];
function App() {
  const [todoList, setTodoList] = useState(originData);
  const [countId, setCountId] = useState(originData.length + 1);
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 소개 */}
          <Route path="/" element={<About />} />
          {/* todo 중첩 */}
          <Route path="/todo">
            <Route
              index
              element={
                <TodoIndex todoList={todoList} setTodoList={setTodoList} />
              }
            ></Route>
            <Route
              path="add"
              element={
                <TodoAdd
                  todoList={todoList}
                  setTodoList={setTodoList}
                  countId={countId}
                  setCountId={setCountId}
                />
              }
            ></Route>
            <Route
              path="detail"
              element={<TodoDetail todoList={todoList} />}
            ></Route>
            <Route
              path="edit/:id"
              element={
                <TodoEdit todoList={todoList} setTodoList={setTodoList} />
              }
            ></Route>
          </Route>
          {/* 잘못된 패스 */}
          <Route path="/todo/edit" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
