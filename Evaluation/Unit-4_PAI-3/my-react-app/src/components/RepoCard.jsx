import React from "react";

function RepoCard({ name, description, stars, forks }) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Description: {description}</p>
      <p>Stars: {stars}</p>
      <p>Forks: {forks}</p>
    </div>
  );
}

export default React.memo(RepoCard);
