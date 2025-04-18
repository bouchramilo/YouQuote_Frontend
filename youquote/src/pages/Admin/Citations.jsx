import { useState, useEffect } from "react";
import Filter from "./../../components/Filter";
import CardQuoteAdmin from "./../../components/CardQuoteAdmin";

const Citations = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ***********************************************************************************************************************
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/quotes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

        const data = await response.json();
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

  // ***********************************************************************************************************************
  // loadind ....
  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Chargement en cours...</p>
      </div>
    );
  }

  // message d'erreur + réssayer une autre fois
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

  // si aucun citations disponible pour le moment
  if (quotes.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Aucune citation populaire disponible</p>
      </div>
    );
  }

  // ***********************************************************************************************************************
  return (
    <div className="md:ml-64 p-8">
      <h2 className="text-3xl font-zen mb-6">Gérer les Citations</h2>

      <Filter />

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 ">
        {quotes.map((quote) => (
          <CardQuoteAdmin key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

export default Citations;
