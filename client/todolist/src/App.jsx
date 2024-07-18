import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { addTodo, deleteTodo, getAllTodo, updateTodo } from "./utils/HandleApi";

function App() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoid, setTodoid] = useState(0);

  useEffect(() => {
    getAllTodo(setTodo);
  }, []);

  const updateMode = (id, title) => {
    setTodoid(id);
    setTask(title);
    setIsUpdating(true);
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Todo App</h1>
          <div className="top">
            <input
              type="text"
              placeholder="Add task.."
              value={task}
              onChange={(event) => {
                setTask(event.target.value);
              }}
            />
            <div
              className="add"
              onClick={
                isUpdating
                  ? () => {
                      updateTodo(todoid, task, setTask, setTodo, setIsUpdating);
                    }
                  : () => {
                      addTodo(task, setTask, setTodo);
                    }
              }
            >
              {isUpdating ? "Update" : "Add"}
            </div>
          </div>
          <div className="list">
            {todo.map((item) => (
              <Todo
                key={item._id}
                text={item.title}
                updateMode={() => {
                  updateMode(item._id, item.title);
                }}
                deleteTodo={() => {
                  deleteTodo(item._id, setTodo);
                }}
              />
            ))}
            <Todo text="Contract" />
            <Todo text="Coding" />
            <Todo text="Wah" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
