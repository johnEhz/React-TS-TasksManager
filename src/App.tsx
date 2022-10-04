import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/Navbar/Navbar";

//Pages
import HomePage from "./pages/HomePage";
import TaskForm from "./pages/TaskFormPage";
import TaskList from "./pages/TaskListPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/update-task/:id" element={<TaskForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
