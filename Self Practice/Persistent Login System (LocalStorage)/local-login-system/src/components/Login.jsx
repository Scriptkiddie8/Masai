import { useState } from "react";

function Login({ islogin }) {
  const [text, setText] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("user", text);
    islogin();
  };

  return (
    <>
      <h2>Login Form...</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Type your name..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
