const STORAGE_KEY = "tasks_list";
const delay = (msec) => new Promise((res) => setTimeout(res, msec));

let initialTasks =[
  {
    id: "1",
    title: "Fix login bug",
    description: "Resolve issue with user authentication on mobile view",
    status: "Pending",
    dueDate: "2025-10-28",
  },
  {
    id: "2",
    title: "Update README",
    description: "Add deployment steps and live preview link",
    status: "Completed",
    dueDate: "2025-10-25",
  },
  {
    id: "3",
    title: "Design task card UI",
    description: "Create responsive layout for task cards using Tailwind",
    status: "Pending",
    dueDate: "2025-10-30",
  },
  {
    id: "4",
    title: "Implement drag-and-drop",
    description: "Use @hello-pangea/dnd to reorder tasks",
    status: "Completed",
    dueDate: "2025-10-26",
  },
  {
    id: "5",
    title: "Refactor TaskForm",
    description: "Unify create/edit logic and add validation",
    status: "Pending",
    dueDate: "2025-10-29",
  },
  {
    id: "6",
    title: "Add filter by status",
    description: "Enable All / Pending / Completed filter buttons",
    status: "Completed",
    dueDate: "2025-10-24",
  },
  {
    id: "7",
    title: "Test localStorage sync",
    description: "Ensure Redux state persists across reloads",
    status: "Pending",
    dueDate: "2025-10-31",
  },
  {
    id: "8",
    title: "Polish navbar branding",
    description: "Add catchy app name and responsive layout",
    status: "Pending",
    dueDate: "2025-11-01",
  },
  {
    id: "9",
    title: "Deploy to Vercel",
    description: "Fix routing and remove basename for clean URLs",
    status: "Completed",
    dueDate: "2025-10-27",
  },
  {
    id: "10",
    title: "Write submission email",
    description: "Include GitHub repo and live URL for review",
    status: "Completed",
    dueDate: "2025-10-27",
  },
];


if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
}

async function getStoredTasks() {
  await delay(300);
  const localVal = localStorage.getItem(STORAGE_KEY);
  return localVal ? JSON.parse(localVal) : [];
}

async function saveTasks(tasks) {
  await delay(300);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const getTasks = async () => {
  await delay(300);
  const tasks = await getStoredTasks();
  return Promise.resolve(tasks);
};

export const addTask = async (task) => {
  await delay(300);
  const tasks = await getStoredTasks();
  const newTask = { ...task, id: Date.now().toString() };
  tasks.push(newTask);
  await saveTasks(tasks);
  return Promise.resolve(newTask);
};

export const updateTasks = async (id, updatedTask) => {
  await delay(300);
  const tasks = await getStoredTasks();
  const updated = tasks.map((task) =>
    task.id.toString() === id.toString() ? { ...task, ...updatedTask } : task
  );
  await saveTasks(updated);
  return Promise.resolve({ id, ...updatedTask });
};

export const deleteTask = async (id) => {
  await delay(300);
  const tasks = await getStoredTasks();
  const filtered = tasks.filter((task) => task.id !== id);
  await saveTasks(filtered);
  return Promise.resolve(id);
};

export const reorderTaskList = async (newOrder) => {
  await saveTasks(newOrder);
  return Promise.resolve(newOrder);
};
