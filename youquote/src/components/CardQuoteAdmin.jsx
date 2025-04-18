const CardQuoteAdmin = ({ quote }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-500">ID: {quote.id}</span>
        <div className="flex space-x-2">
          <button className="text-accent hover:text-primary">✏️</button>
          {/* {!quote.is_valide && (
            <button className="text-green-600 hover:text-green-800">✔️</button>
          )} */}
          <button className="text-red-600 hover:text-red-800">🗑️</button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-zen mb-2">"{quote.content}"</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <span>{quote.user}</span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Catégories:</span>
          <span className="flex flex-wrap gap-1">
            {quote.categories.map((cate, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-secondary rounded-full text-xs"
              >
                {cate}
              </span>
            ))}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Tags:</span>
          <span className="flex flex-wrap gap-1">
            {quote.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-secondary rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">❤️</span>
            <span>{quote.popularite} likes</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">⭐</span>
            <span>{Math.floor(quote.popularite / 10)} favoris</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardQuoteAdmin;
