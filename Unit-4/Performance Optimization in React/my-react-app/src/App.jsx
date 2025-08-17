import React, { useState, useCallback } from "react";
import Post from "./components/Post";
import { useTimer } from "./hooks/useTimer";

export default function App() {
  const timer = useTimer();

  const [posts, setPosts] = useState([
    { id: 1, title: "Title 1", body: "Post 1", verified: false },
    { id: 2, title: "Title 2", body: "Post 2", verified: false },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addPost = () => {
    if (!title.trim() || !body.trim()) return;

    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: prevPosts.length + 1,
        title,
        body,
        verified: false,
      },
    ]);

    setTitle("");
    setBody("");
  };

  // useCallback to memoize the toggle function
  const toggleVerify = useCallback(
    (id) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, verified: !post.verified } : post
        )
      );
    },
    [setPosts]
  );

  return (
    <div>
      <h1>Timer: {timer}</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <button onClick={addPost}>Add Post</button>

      <h2>Posts</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} toggleVerify={toggleVerify} />
      ))}
    </div>
  );
}
