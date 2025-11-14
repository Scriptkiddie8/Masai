import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <h1>Theme Toggle App</h1>
      <ThemeToggle />
    </div>
  );
}

export default App;
