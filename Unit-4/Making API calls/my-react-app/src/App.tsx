import React from "react";
import { useFetchPosts } from "./hooks/useFetchPosts";
import PostList from "./components/PostList";

const App: React.FC = () => {
  const { posts, loading, error } = useFetchPosts();

  return (
    <div style={{ padding: "1rem" }}>
      <h1>React + TypeScript API Fetch Example</h1>
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  );
};

export default App;
