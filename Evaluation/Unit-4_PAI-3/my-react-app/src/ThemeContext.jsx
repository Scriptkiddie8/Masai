import { createContext, useState } from "react";

export const ThemeContext = createContext({ children });

export function ThemeProvider() {
  const [theme, setTheme] = useState("light");

  const togglebtn = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, togglebtn }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
}
