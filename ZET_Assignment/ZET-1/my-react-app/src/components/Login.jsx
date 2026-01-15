import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setToken(null);

    try {
      const res = await fetch(
        "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, Password }),
        }
      );
      const data = await res.json();

      if (!res) {
        throw new Error(data.message || "Login Failed");
      }

      setToken(data.token);
      setMessage("Login Successfully...");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={getLogin}>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
      </form>
      {message && <p>{message}</p>}

      {token && (
        <div>
          <b>Auth Token:</b>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
