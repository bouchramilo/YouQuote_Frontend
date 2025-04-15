// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./components/partials/LayoutMain";
import LayoutDashboard from "./components/partials/LayoutDashboard";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout principal : Header + Footer */}
        <Route element={<LayoutMain />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Layout dashboard : Sidebar uniquement */}
        <Route element={<LayoutDashboard />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
