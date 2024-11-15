// client/src/App.tsx
import "./App.css";
import Home from "./pages/Home/Home";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
