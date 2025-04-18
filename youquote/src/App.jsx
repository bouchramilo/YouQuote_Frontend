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
import AddQuote from "./pages/AddQuote";
// admin ++++++++++++
import Dashboard from "./pages/Admin/Dashboard";
import Categories from "./pages/Admin/Categories";
import Citations from "./pages/Admin/Citations";
import CitationsVal from "./pages/Admin/CitationsVal";
import SoftDelete from "./pages/Admin/SoftDelete";
import Favories from "./pages/Admin/Favories";
import Likes from "./pages/Admin/Likes";
import Users from "./pages/Admin/Users";
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
            <Route path="/quotes/add" element={<AddQuote />} />
          </Route>

          {/* Layout dashboard : Sidebar uniquement */}
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/quotes" element={<Citations />} />
            <Route path="/quotes/valider" element={<CitationsVal />} />
            <Route path="/corbeille" element={<SoftDelete />} />
            <Route path="/users" element={<Users />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/favories" element={<Favories />} />
          </Route>
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
}
