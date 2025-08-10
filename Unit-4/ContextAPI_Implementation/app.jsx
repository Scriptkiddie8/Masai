import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";

const ThemedBox = () => {
  const { theme } = useTheme();
  const bgColor = theme === "light" ? "#fff" : "#333";
  const color = theme === "light" ? "#000" : "#fff";

  return (
    <div style={{ backgroundColor: bgColor, color, padding: "1rem", marginTop: "1rem" }}>
      This box background changes based on theme!
    </div>
  );
};

const App = () => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ThemedBox />
    </>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
