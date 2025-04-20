import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardQoute from "./../../components/CardQuote";

const ListPopulaire = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/citations/populaire", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          credentials: "include",
        });

        console.log("Réponse du serveur:", response);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Erreur ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("liste de spopu : ", data);
        setQuotes(data.data || data);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Chargement en cours...</p>
      </div>
    );
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

  if (quotes.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Aucune citation populaire disponible</p>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-8 text-center">
          Citations Populaires
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <CardQoute key={quote.id} quote={quote} />
          ))}
        </div>

        {quotes.length > 0 && (
          <div className="mt-10 text-center">
            <Link to="/quotes/more">
              <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors !rounded-button whitespace-nowrap">
                Voir plus de citations
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListPopulaire;
