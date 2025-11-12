import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserList from "./components/UserList";

function App() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CurrentTime = new Date().toLocaleTimeString();

  async function fetchData() {
    try {
      setLoading(true);
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      let data = await res.json();
      setusers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setError(null);
    fetchData();
  };

  if (loading) return <p style={{ color: "blue" }}>Loading...</p>;
  if (error) {
    return (
      <>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={handleRefresh}>Refresh</button>
      </>
    );
  }
  return (
    <div>
      <h2>Users List</h2>
      <h3>Fetched Time: {CurrentTime}</h3>

      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {users.map((user) => (
          <>
            <UserList key={user.id} user={user} />
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
