const STORAGE_KEY = "tasks_list";
const delay = (msec) => new Promise((res) => setTimeout(res, msec));

let initialTasks = [
  {
    id: "1",
    title: "UI/UX Design Review",
    description:
      "Conduct design review for new dashboard interface with design team.",
    status: "Completed",
    dueDate: "2025-11-01",
  },
  {
    id: "2",
    title: "Client Feedback Integration",
    description:
      "Analyze recent feedback and prioritize feature requests for Q4 roadmap.",
    status: "Completed",
    dueDate: "2025-10-30",
  },
  {
    id: "3",
    title: "Product Catalog Audit",
    description:
      "Review and update all product listings for accuracy and completeness.",
    status: "Pending",
    dueDate: "2025-10-27",
  },

  {
    id: "4",
    title: "Team Standup Planning",
    description: "Prepare agenda and talking points for weekly team standup.",
    status: "Pending",
    dueDate: "2025-10-25",
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
