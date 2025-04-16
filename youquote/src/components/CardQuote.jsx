import { Link } from 'react-router-dom';
 


const CardQuote = ({ key, quote }) => {
  const categories = quote.categories || []; // Ajout d'une valeur par défaut

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-secondary transition-shadow hover:shadow-md">
      <blockquote className="quote-text text-lg text-text mb-4 leading-relaxed">
        "{quote.content}"
      </blockquote>

      <p className="font-semibold text-gray-700 mb-3">{quote.user}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cate, index) => (
          <span
            key={index} // Ajout d'une clé unique
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
          >
            {cate}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors !rounded-button">
            <span className="w-8 h-8 flex items-center justify-center">
              <i className="ri-heart-line"></i>
            </span>
            <span className="text-sm">245</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors !rounded-button">
            <span className="w-8 h-8 flex items-center justify-center">
              <i className="ri-star-line"></i>
            </span>
          </button>
        </div>
        <Link to={`/quotes/${quote.id}`}>
          <button className="text-primary hover:text-primary-dark text-sm font-medium !rounded-button whitespace-nowrap">
            Voir détails
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardQuote;
