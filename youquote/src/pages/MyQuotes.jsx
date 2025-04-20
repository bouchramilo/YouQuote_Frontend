import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CardQuoteUser from "./../components/CardQuoteUser";
import { Context } from "./../context/UserContext";

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, role } = useContext(Context);

  useEffect(() => {
    async function fetchUserQuotes() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/citations/user/${userId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des citations");
        }

        const data = await response.json();
        console.log("myQuote : ",data);
        
        setQuotes(data.data); // Mettre à jour l'état avec les données reçues
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserQuotes();
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

  if (quotes.length === 0 && !loading) {
    return (
      <div className="text-center py-10">
        <p>Aucune citation disponible pour le moment</p>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-6 px-2">
        <h2 className="text-3xl font-zen mb-6">Mes Citations</h2>
        <Link
          to="/quotes/add"
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Ajouter
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <CardQuoteUser
            key={quote.id}
            quote={quote}
            
          />
        ))}
      </div>
    </div>
  );
};

export default MyQuotes;
