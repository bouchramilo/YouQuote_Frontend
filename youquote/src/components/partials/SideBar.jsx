import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside className="w-64 bg-primary text-white fixed h-full hidden md:block p-4">
      <div className="p-4">
        <h2 className="text-2xl font-bold font-heading">Admin Panel</h2>
      </div>
      <nav className="mt-6">
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
          Gérer les citations
        </Link>
        <Link to="/users" className="block py-2 px-4 hover:bg-secondary">
          Utilisateurs
        </Link>
        <Link to="/likes" className="block py-2 px-4 hover:bg-secondary">
          Likes
        </Link>
        <Link to="/favories" className="block py-2 px-4 hover:bg-secondary">
          Favoris
        </Link>
        <Link to="/corbeille" className="block py-2 px-4 hover:bg-secondary">
          Corbeille
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
