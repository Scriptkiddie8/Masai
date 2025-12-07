import React, { useEffect, useState } from "react";

function App() {
  const [feedback, setFeedback] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("feedback"));
    if (saved) {
      setList(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(list));
  }, [list]);

  const hadleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) return;
    setList(...list, feedback);
    setFeedback(feedback);
  };

  const handleDelete = (index) => {
    const updatelist = list.filter((_, i) => i !== index);
    setList(updatelist);
  };
  return (
    <>
      <div>
        <h2>Feedback Form:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <ul>
          {list.map((item, i) => (
            <li>
              {item}
              <button onClick={() => handleDelete(i)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
