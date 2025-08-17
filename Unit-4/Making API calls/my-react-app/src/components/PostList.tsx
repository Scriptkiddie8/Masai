import React from "react";
import type { Post } from "../hooks/useFetchPosts";

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const PostList: React.FC<PostListProps> = ({ posts, loading, error }) => {
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(({ id, title, body }) => (
          <li key={id} style={{ marginBottom: "1rem" }}>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
