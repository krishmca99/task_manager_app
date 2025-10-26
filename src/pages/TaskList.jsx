import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasks, deleteTask, reorderTaskThunk } from "../redux/tasksThunks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.status === filter
  );

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This task will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteTask(id));
      Swal.fire("Deleted!", "Your task has been removed.", "success");
    }
  });
};

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(filteredTasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    dispatch(reorderTaskThunk(reordered));
  };

  return (
    <div className="p-6 w-[95%] max-w-7xl mx-auto bg-gray-50 rounded-b-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Lists</h1>
        <Link
          to="/tasks/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Task
        </Link>
      </div>

      <div className="mb-4">
        {["All", "Pending", "Completed"].map((status) => {
          const isActive = filter === status;
          const baseClasses =
            "mr-2 px-3 py-1 rounded font-medium transition-colors";

          const bgColor = isActive
            ? status === "Pending"
              ? "bg-amber-500 text-white"
              : status === "Completed"
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800";

          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`${baseClasses} ${bgColor}`}
            >
              {status}
            </button>
          );
        })}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskTable">
          {(provided) => (
            <div className="overflow-x-auto rounded shadow">
              <table className="w-full min-w-[600px] bg-white border border-gray-300">
                <thead className="bg-gray-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-5 py-2 text-left">Status</th>
                    <th className="px-5 py-2 text-left">Due Date</th>
                    <th className="px-6 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="px-4 py-2">{task.title}</td>
                          <td className="px-4 py-2">{task.description}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`w-full rounded-r-2xl rounded-l-2xl px-4 py-1 ${
                                task.status === "Pending"
                                  ? "bg-amber-300"
                                  : "bg-green-300"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{task.dueDate}</td>
                          <td className="px-4 py-2 space-x-2">
                            <div className="flex flex-wrap gap-2 sm:items-center justify-center">
                              <Link
                                to={`/tasks/${task.id}`}
                                className="font-medium text-white px-4 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-700 font-medium text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
