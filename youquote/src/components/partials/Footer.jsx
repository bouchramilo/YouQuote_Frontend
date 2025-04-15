const Footer = () => {
  return (
    <footer className="bg-text text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-['Pacifico'] text-white">
              YouQuote
            </a>
            <p className="mt-2 text-gray-400 text-sm">
              Découvrez, partagez et sauvegardez vos citations préférées
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-semibold mb-2">Navigation</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rechercher
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Connexion
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">À propos</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Qui sommes-nous
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 YouQuote. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
