import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("feedbacklist"));
    if (saved) {
      setList(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) return;
    setList([...list, feedback]);
    setFeedback("");
  };

  const handleDelete = (index) => {
    const updatelist = list.filter((_, i) => i !== index);
    setList(updatelist);
  };

  const handleClearAll = () => {
    setList([]);
    localStorage.setItem("feedback", JSON.stringify([]));
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Feedback Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <p>Characters: {feedback.length}</p>
          <button type="submit">Add</button>
        </form>

        <h3>
          All Feedbacks: <button onClick={handleClearAll}>Clear All</button>
        </h3>
        <ul>
          {list.map((item, i) => (
            <li key={i}>
              {item}
              <button
                style={{ margin: "20px" }}
                onClick={() => {
                  handleDelete(i);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
