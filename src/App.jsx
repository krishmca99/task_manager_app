import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="bg-blue-200 w-full h-screen m-0 p-0">
      <BrowserRouter className="bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
