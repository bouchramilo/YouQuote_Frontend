import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Likes = () => {
  const [Likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/likes/${id}`, {
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

        const { data } = await response.json();
        setLikes(data || []);
      } catch (err) {
        console.error("Erreur de fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [id]); // Ajout de id comme dépendance

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Erreur: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (Likes.length === 0) {
    return (
      <div className="md:ml-64 p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-zen mb-6">Likes</h2>
        <div className="bg-white rounded-lg shadow p-4 min-h-screen">
          <p>Aucune Like disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-64 p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-zen mb-6">Likes</h2>

      <div className="bg-white rounded-lg shadow p-4 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Likes.map((quote) => (
            <div
              key={quote.id || quote.favori_id}
              style={{
                borderRadius: "88% 12% 90% 10% / 12% 91% 9% 88%",
              }}
              className="bg-secondary/50 p-6 border-2 border-primary rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Auteur:</span>{" "}
                {quote.citation?.user_name ||
                  quote.user_name?.name ||
                  "Inconnu"}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Email:</span>{" "}
                {quote.citation?.user_email ||
                  quote.user_email?.email ||
                  "Inconnu"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Ajouté le:</span>{" "}
                {new Date(
                  quote.added_at || quote.created_at
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Likes;
