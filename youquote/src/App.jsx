// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./components/partials/LayoutMain";
import LayoutDashboard from "./components/partials/LayoutDashboard";
import UserContext from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Quote from "./pages/Quote";
import MoreQuotes from "./pages/MoreQuotes";
import Dashboard from "./pages/Admin/Dashboard";
import Categories from "./pages/Admin/Categories";
import Tags from "./pages/Admin/Tags";

export default function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          {/* Layout principal : Header + Footer */}
          <Route element={<LayoutMain />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quote/:id" element={<Quote />} />
            <Route path="/quotes/more" element={<MoreQuotes />} />
          </Route>

          {/* Layout dashboard : Sidebar uniquement */}
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/tags" element={<Tags />} />
          </Route>
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
}
