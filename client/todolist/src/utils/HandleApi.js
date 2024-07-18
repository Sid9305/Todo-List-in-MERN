import axios from "axios";
const baseUrl = "http://localhost:8000";

const getAllTodo = (setTodo) => {
  axios.get(`${baseUrl}/display`).then((response) => setTodo(response.data));
};

// Function to add a new todo
const addTodo = (task, setTask, setTodo) => {
  axios
    .post(baseUrl, { title: task })
    .then(() => {
      setTask("");
      getAllTodo(setTodo);
    })
    .catch((error) => console.error("Error adding todo:", error));
};

// Function to delete a todo
const deleteTodo = (id, setTodo) => {
  axios
    .delete(`${baseUrl}/delete/${id}`)
    .then(() => {
      getAllTodo(setTodo);
    })
    .catch((error) => console.error("Error deleting todo:", error));
};

const updateTodo = (todoid, task, setTask, setTodo, setIsUpdating) => {
  axios
    .put(`${baseUrl}/update/${todoid}`, { _id: todoid, title: task })
    .then(() => {
      setTask("");
      setIsUpdating(false);
      getAllTodo(setTodo);
    })
    .catch((error) => console.error("Error updating todo:", error));
};
export { getAllTodo, addTodo, deleteTodo , updateTodo};
