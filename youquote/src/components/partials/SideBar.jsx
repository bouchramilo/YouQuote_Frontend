import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../../context/UserContext";


const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(Context);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="w-64 bg-primary text-white fixed h-full hidden md:block p-4">
      <div className="p-4">
        <h2 className="text-2xl font-bold font-heading">Admin Panel</h2>
      </div>
      <nav className="flex flex-col gap-44">
        <div className="mt-6">
          <Link to="/" className="block py-2 px-4 hover:bg-secondary">
            Accueil
          </Link>
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-secondary">
            Tableau de bord
          </Link>
          <Link to="/categories" className="block py-2 px-4 hover:bg-secondary">
            Gérer les catégories
          </Link>
          <Link to="/tags" className="block py-2 px-4 hover:bg-secondary">
            Gérer les tags
          </Link>
          <Link to="/quotes" className="block py-2 px-4 hover:bg-secondary">
            Les citations validées
          </Link>
          <Link
            to="/quotes/valider"
            className="block py-2 px-4 hover:bg-secondary"
          >
            Les citations non validées
          </Link>
          <Link to="/users" className="block py-2 px-4 hover:bg-secondary">
            Utilisateurs
          </Link>
          <Link to="/corbeille" className="block py-2 px-4 hover:bg-secondary">
            Corbeille
          </Link>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="block py-2 px-4 hover:bg-secondary font-medium hover:text-red-800 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
