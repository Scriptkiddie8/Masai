import { useEffect, useState } from "react";
import "./FetchData.css";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchuser = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      setError("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Fetching user from JsonPlaceholder...</h2>
      <div className="grid">
        {users.map((user) => (
          <div className="card">
            <h4>
              <b>userID:</b>
              {user.userId}
            </h4>
            <p>
              <b>ID:</b>
              {user.id}
            </p>
            <p>
              <b>Title:</b>
              {user.title}
            </p>
            <p>
              <b>Body:</b>
              {user.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FetchData;
