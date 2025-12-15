import React, { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.payload, complete: false },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, complete: !todo.complete }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

function Todo2() {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <>
      <button onClick={() => dispatch({ type: "ADD", payload: "New Task" })}>
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.complete ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo2;
