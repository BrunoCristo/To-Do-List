const db = require("../firebaseConfig");
const os = require("os");

// Função para criar tarefas
const addTasks = async (tasks) => {
  const createdTasks = [];

  const batch = db.batch();
  tasks.forEach((task) => {
    const taskRef = db.collection("tasks").doc();
    const taskData = { ...task };
    batch.set(taskRef, taskData);
    createdTasks.push({ id: taskRef.id, ...taskData });
  });
  await batch.commit();

  return createdTasks; // Retorna as tarefas criadas com IDs
};

// Função para buscar todas as tarefas
const getTasks = async () => {
  const tasksSnapshot = await db.collection("tasks").get();
  return tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Função para atualizar o status de uma tarefa
const updateTaskStatus = async (id, status) => {
  const taskRef = db.collection("tasks").doc(id);
  await taskRef.update({ status });
};

module.exports = {
  addTasks,
  getTasks,
  updateTaskStatus,
};
