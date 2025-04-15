import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-3xl font-heading text-primary">
          YouQuote
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="font-medium text-gray-900 hover:text-primary transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/register"
            className="font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Inscription
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-2 font-medium text-gray-600 hover:text-primary transition-colors"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-user-line"></i>
            </span>
            <span>Connexion</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
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
            <Link
              to="/"
              className="py-2 font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Accueil
            </Link>
            <Link
              to="/register"
              className="py-2 font-medium text-gray-600 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Inscription
            </Link>
            <Link
              to="/login"
              className="py-2 flex items-center space-x-2 font-medium text-gray-600 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-user-line"></i>
              </span>
              <span>Connexion</span>
            </Link>
            <Link
              to="/dashboard"
              className="py-2 font-medium text-gray-600 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
