
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'tasks';
const saveTasks = async (tasks) => {
  try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
      console.error("Error saving tasks:", err);
  }
};

const getTasks = async () => {
  try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (err) {
      console.error("Error loading tasks:", err);
      return [];
  }
};

const addTask = async (newTask) => {
  const tasks = await getTasks();
  const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // מצא את ה-ID הגבוה ביותר והוסף 1
  const newTaskObject = { id: newId, name: newTask, isComplete: false };
  const updatedTasks = [...tasks, newTaskObject];
  await saveTasks(updatedTasks);
  return newTaskObject;
};

const updateTaskCompletion = async (id) => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
  );
  await saveTasks(updatedTasks);
};

const deleteTask = async (id) => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  await saveTasks(filteredTasks);
};

export default {
  getTasks,
  addTask,
  updateTaskCompletion,
  deleteTask
};