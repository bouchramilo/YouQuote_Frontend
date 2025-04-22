import CardFavorite from "./../components/CardFavorite";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./../context/UserContext";

const MyFavorites = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(Context);

  useEffect(() => {
    async function fetchUserQuotes() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/favories/user/${userId}`, {
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
        console.log("favories : ", data);

        setQuotes(data.data); 
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
      <main className="container mx-auto p-8">
        <div className="text-center py-10">
          <p>Aucune citation disponible pour le moment</p>
        </div>
      </main>
    );
  }
  return (
    <main className="container mx-auto p-8">
      <div className="mb-8">
      <h2 className="text-3xl font-zen mb-6">Mes Favories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <CardFavorite key={quote.id} quote={quote} user_id={userId} />
        ))}
      </div>
    </main>
  );
};

export default MyFavorites;
