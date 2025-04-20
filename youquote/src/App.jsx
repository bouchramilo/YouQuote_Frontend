// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutMain from "./components/partials/LayoutMain";
import LayoutDashboard from "./components/partials/LayoutDashboard";
import LayoutAuteur from "./components/partials/LayoutAuteur";
//
import UserContext from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Quote from "./pages/Quote";
import MoreQuotes from "./pages/MoreQuotes";
import AddQuote from "./pages/AddQuote";
import EditQuote from "./pages/EditQuote";
import MyQuotes from "./pages/MyQuotes";
import MyFavorites from "./pages/MyFavorites";
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
import Error404 from "./components/Error404";

export default function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          {/* Layout principal : Header + Footer */}
          <Route element={<LayoutMain />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
              <Route path="/quotes/edit/:id" element={<EditQuote />} />
            <Route element={<LayoutAuteur />}>
              <Route path="/quote/:id" element={<Quote />} />
              <Route path="/quotes/more" element={<MoreQuotes />} />
              <Route path="/quotes/add" element={<AddQuote />} />
              <Route path="/myquotes" element={<MyQuotes />} />
              <Route path="/myfavorites" element={<MyFavorites />} />
            </Route>
          </Route>
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/quotes" element={<Citations />} />
            <Route path="/quotes/valider" element={<CitationsVal />} />
            <Route path="/corbeille" element={<SoftDelete />} />
            <Route path="/users" element={<Users />} />
            <Route path="/likes/:id" element={<Likes />} />
            <Route path="/favories/:id" element={<Favories />} />
          </Route>
          <Route path="*" element={<Error404 backTo={"/"} />} />{" "}
        </Routes>
        {/* Layout dashboard : Sidebar uniquement */}
      </UserContext>
    </BrowserRouter>
  );
}
