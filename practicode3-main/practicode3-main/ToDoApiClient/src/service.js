import axios from 'axios';

// הגדרת כתובת ה-API כ-default
axios.defaults.baseURL = process.env.REACT_APP_API;

// הוספת interceptor לתפיסת שגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Response error!:', error); // רושם את השגיאה ללוג
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`/task`);    
      return result.data;
    } catch (error) {
      console.log('Error fetching tasks:', error);
      return error;
    }
  },

  addTask: async (name) => {
    console.log('addTask', name);
    const newTask = {
      name: name,
      IsComplete: false 
    };
    try {
      const response = await axios.post(`/task`, newTask);
      return response.data; 
    } catch (error) {
      console.log('Error adding task:', error);
      return error; 
    }
  },

  setCompleted: async (id) => {
    console.log('setCompleted', { id });
    try {
      const response = await axios.put(`/task/${id}`);
      return response; 
    } catch (error) {
      console.log('Error updating task:', error);
      return error; 
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', { id });
    try {
      const response = await axios.delete(`/task/${id}`);
      return response.data; // מחזיר את התגובה מהשרת
    } catch (error) {
      console.log('Error deleting task:', error);
      return error; 
    }
  }
};