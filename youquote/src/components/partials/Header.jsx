import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "./../../context/UserContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(Context);

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-3xl font-heading text-primary">
          YouQuote
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-900 hover:text-primary transition-colors">
            Accueil
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/register" className="font-medium text-gray-600 hover:text-primary transition-colors">
                Inscription
              </Link>
              <Link to="/login" className="flex items-center space-x-2 font-medium text-gray-600 hover:text-primary transition-colors">
                <span className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </span>
                <span>Connexion</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="flex items-center space-x-2 font-medium text-gray-600 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="py-2 font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Déconnexion
              </button>
            </>
          )}
        </nav>

        {/* Menu Burger Button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700"
          onClick={toggleMenu}
        >
          <i className={`text-xl ${isOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/" className="py-2 font-medium text-gray-900 hover:text-primary transition-colors" onClick={toggleMenu}>
              Accueil
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="py-2 font-medium text-gray-600 hover:text-primary transition-colors" onClick={toggleMenu}>
                  Inscription
                </Link>
                <Link to="/login" className="py-2 flex items-center space-x-2 font-medium text-gray-600 hover:text-primary transition-colors" onClick={toggleMenu}>
                  <span className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-user-line"></i>
                  </span>
                  <span>Connexion</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="py-2 font-medium text-gray-600 hover:text-primary transition-colors" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 font-medium text-gray-600 hover:text-primary transition-colors text-left"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;