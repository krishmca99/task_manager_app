import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../redux/tasksThunks";

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingTask = useSelector((state) =>
    state.tasks.items.find((t) => t.id.toString() === id)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDueDate(existingTask.dueDate);
      setStatus(existingTask.status);
    }
  }, [isEdit, existingTask]);

  const validateInputs = () => {
    const error = {};
    if (!title.trim()) error.title = "Title is required";
    if (!description.trim()) error.description = "Description is required";
    if (!dueDate) error.dueDate = "Due date is required";
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    const taskData = { title, description, dueDate, status };

    if (isEdit) {
      await dispatch(updateTask({ id, data: taskData }));
    } else {
      await dispatch(createTask(taskData));
    }

    setLoading(false);
    navigate("/tasks");
  };

  return (
    <div className="py-8 bg-gray-100 w-[95%] max-w-7xl mx-auto rounded-b-sm md:w-[95%] px-2">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-center text-2xl font-bold">
          {isEdit ? "Edit Task" : "Create New Task"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 mt-1"
            />
            {errors.title && (
              <span className="text-red-600 text-sm">{errors.title}</span>
            )}
          </div>

          <div className="my-2">
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border rounded p-2 mt-1"
            />
            {errors.description && (
              <span className="text-red-600 text-sm">{errors.description}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 my-2">
            <div>
              <label className="block font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
              {errors.dueDate && (
                <span className="text-red-600 text-sm">{errors.dueDate}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`rounded bg-indigo-600 hover:bg-indigo-500
 px-4 py-2 text-white font-bold my-2 ${
   loading ? "opacity-50 cursor-not-allowed" : ""
 }`}
          >
            {isEdit ? "Update" : "Save Task"}
          </button>
          <button
            onClick={() => navigate("/tasks")}
            className="rounded shadow bg-violet-600 hover:bg-violet-500
 px-4 py-2 text-white font-bold my-2 mx-2"
          >
            Return to Tasks
          </button>
        </form>
      </div>
    </div>
  );
}
