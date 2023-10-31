/* VENDOR */
import { Route, Routes, Navigate } from "react-router-dom";

/* APPLICATION */
import "./App.css";
import { Header } from "../Header/Header";
import { Tasks } from "../Lists/Tasks";
import {Categories} from "../Lists/Categories";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Navigate to={"/tasks"} />} />
      </Routes>
    </div>
  );
}

export default App;
