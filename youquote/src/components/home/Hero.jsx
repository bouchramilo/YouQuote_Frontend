import { useState, useEffect } from 'react';
import Image from './../../assets/image_1.png';

const Hero = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("/api/citations/random/1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || 
            `Erreur ${response.status}: ${response.statusText}`
          );
        }

        const { data } = await response.json();

        console.log("data data data : ", data);
        
        setQuote(data);
        setLikeCount(data.likes_count || 0);
        setIsFavorite(data.is_favorite || false);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

//   const handleLike = async () => {
//     try {
//       const response = await fetch(`/api/quotes/${quote.id}/like`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
//         },
//         credentials: "include",
//       });

//       if (response.ok) {
//         setLikeCount(prev => prev + 1);
//       }
//     } catch (error) {
//       console.error("Erreur lors du like:", error);
//     }
//   };

//   const handleFavorite = async () => {
//     try {
//       const endpoint = isFavorite ? 'unfavorite' : 'favorite';
//       const response = await fetch(`/api/quotes/${quote.id}/${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
//         },
//         credentials: "include",
//       });



//       if (response.ok) {
//         setIsFavorite(!isFavorite);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la mise en favori:", error);
//     }
//   };

  if (loading) {
    return (
      <section className="hero-section py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p>Chargement de la citation du jour...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hero-section py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-red-500">
            <p>Erreur: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!quote) {
    return (
      <section className="hero-section py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p>Aucune citation disponible</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section py-12 md:py-20 w-full">
      <div className="container mx-auto px-4 ">
        <div className="max-w-3xl mx-auto ">
          <h2 className="text-center text-3xl md:text-4xl font-heading font-bold text-text mb-8">
            Citation du Jour
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-secondary">
            <blockquote className="quote-text text-xl md:text-2xl text-text italic mb-6 leading-relaxed">
              "{quote.content}"
            </blockquote>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="font-semibold text-gray-700">
                  {quote.user || "Auteur inconnu"}
                </p>
                {quote.categories?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {quote.categories.map(category => (
                      <span 
                        key={category.id} 
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <button 
                //   onClick={handleLike}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors !rounded-button"
                >
                  <span className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-heart-line"></i>
                  </span>
                  <span className="text-sm whitespace-nowrap">{likeCount}</span>
                </button>

                <button 
                //   onClick={handleFavorite}
                  className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 transition-colors !rounded-button"
                >
                  <span className="w-8 h-8 flex items-center justify-center">
                    <i className={isFavorite ? "ri-star-fill" : "ri-star-line"}></i>
                  </span>
                  <span className="text-sm whitespace-nowrap">
                    {isFavorite ? "Favori" : "Favoris"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;