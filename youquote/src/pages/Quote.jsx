import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Quote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/quotes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        // console.log("test de response de details : ", response);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Erreur ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        // console.log("test de data  de details : ", data);
        setQuote(data.data || data);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Chargement en cours...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Erreur: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!quote) {
    return <div className="text-center py-10">Citation introuvable</div>;
  }
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-accent/10 rounded-lg p-8 mb-8 shadow-lg shadow-gray-400 transition-shadow hover:shadow-lg hover:shadow-accent ">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Par {quote.user}</h2>
            <span className="text-sm text-gray-500">
              Publié le {quote.created_at}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-zen leading-relaxed">"{quote.content}"</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Catégories</h3>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {quote.categories.map((cate, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary rounded-full"
                >
                  {cate}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {quote.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-accent/50 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              className="like-button flex items-center"
              data-liked="false"
            >
              <span className="mr-2">❤️</span>
              <span className="like-count">{quote.likes_count}</span>
            </button>
            <button
              className="favorite-button flex items-center"
              data-favorited="false"
            >
              <span className="mr-2">⭐</span>
              <span>{quote.favorites_count}</span>
            </button>
          </div>
          <div className="text-sm text-gray-500">
            <span>Vues: {quote.popularite}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
