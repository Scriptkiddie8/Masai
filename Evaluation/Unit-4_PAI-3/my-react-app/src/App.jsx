import React from "react";
import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import { Loader, SunMoon } from "lucide-react";
import { ThemeContext } from "./ThemeContext";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(res.data);
      } catch (error) {
        console.log(error.message);
        setError("User not Found");
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        <SunMoon />
      </button>

      <div>
        <SearchBar onSearch={setUsername} />

        {loading && <Loader />}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          repos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              description={repo.description}
              stars={repo.stargazers_count}
              forks={repo.forks_count}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
