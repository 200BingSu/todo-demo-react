import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import { TodoProvider } from "./contexts/TodoContext";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TodoIndex from "./pages/todo/Index";
import TodoAdd from "./pages/todo/TodoAdd";
import TodoDetail from "./pages/todo/TodoDetail";
import TodoEdit from "./pages/todo/TodoEdit";
import { ThemeProvider } from "./contexts/ThemeContext";
import Join from "./pages/member/Join";

function App() {
  return (
    <TodoProvider>
      <Router>
        <ThemeProvider>
          <Layout>
            <Routes>
              {/* 소개 */}
              <Route path="/" element={<About />} />
              {/* 회원가입 */}
              <Route path="/member" element={<Join />} />
              {/* todo 중첩 */}
              <Route path="/todo">
                <Route index element={<TodoIndex />}></Route>
                <Route path="add" element={<TodoAdd />}></Route>
                <Route path="detail" element={<TodoDetail />}></Route>
                <Route path="edit/:id" element={<TodoEdit />}></Route>
              </Route>
              {/* 잘못된 패스 */}
              <Route path="/todo/edit" element={<NotFound />}></Route>
            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
    </TodoProvider>
  );
}
export default App;
