import React from "react";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}

export default App;
