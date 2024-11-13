// client/src/App.tsx
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
