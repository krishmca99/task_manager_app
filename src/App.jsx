import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";



export default function App() {
  return (
    <div className="bg-blue-200 w-full h-screen m-0 p-0">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
