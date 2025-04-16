const SearchSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="w-5 h-5 flex items-center justify-center text-gray-400">
                <i className="ri-search-line"></i>
              </span>
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-3 border border-secondary rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Rechercher par tag ou mot-clé"
            />
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Tags populaires:</p>
            <div className="flex flex-wrap gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full transition-colors !rounded-button whitespace-nowrap">
                Amour
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full transition-colors !rounded-button whitespace-nowrap">
                Motivation
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full transition-colors !rounded-button whitespace-nowrap">
                Succès
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full transition-colors !rounded-button whitespace-nowrap">
                Bonheur
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-full transition-colors !rounded-button whitespace-nowrap">
                Philosophie
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
