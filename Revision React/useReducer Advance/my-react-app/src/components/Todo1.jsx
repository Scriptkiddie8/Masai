import React, { useState } from "react";

function Todo1() {
  const [todos, setTodo] = useState([]);

  function addTask(text) {
    setTodo([...todos, { id: Date.now(), text, complete: false }]);
  }
  function toggleTodo(id) {
    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodo(todos.filter((todo) => todo.id != id));
  }
  return (
    <>
      <button onClick={() => addTask("New Task")}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.complete ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo1;
