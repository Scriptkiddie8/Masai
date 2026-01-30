import "./App.css";
import Contact from "./components/Contact";
import Home from "./components/Home";
import About from "./components/About";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <nav>
        <Link to="/home">Home</Link> | <Link to="/contact">Contact</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
