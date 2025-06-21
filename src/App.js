import React, { useEffect, useState } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
    const addOrEditTodo = () => {
  if (!input.trim()) return;

  if (editId !== null) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editId ? { ...todo, text: input, dueDate } : todo
      )
    );
    setEditId(null);
  } else {
    setTodos([
      { id: Date.now(), text: input, done: false, dueDate },
      ...todos,
    ]);
  }

  setInput("");
  setDueDate("");
};

  });
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [dueDate, setDueDate] = useState("");

 // all, active, completed

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const toggleDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "active") return !todo.done;
    return true;
  });

  const addOrEditTodo = () => {
  if (!input.trim()) return;

  if (editId !== null) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editId ? { ...todo, text: input, dueDate } : todo
      )
    );
    setEditId(null);
  } else {
    setTodos([
      { id: Date.now(), text: input, done: false, dueDate },
      ...todos,
    ]);
  }

  setInput("");
  setDueDate("");
};


  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addOrEditTodo}>{editId ? "Update" : "Add"}</button>
      </div>
<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>


      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? " Light Mode" : " Dark Mode"}
</button>

      </div>
      <ul className="todo-list">
<AnimatePresence>
  {filteredTodos.map((todo) => (
    <motion.li
      key={todo.id}
      className={todo.done ? "done" : ""}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      layout
    >
      <span onClick={() => toggleDone(todo.id)}>{todo.text}</span>
      <small>Due: {todo.dueDate}</small>
      <div>
        <button onClick={() => startEdit(todo)}>Edit</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </motion.li>
  ))}
</AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
