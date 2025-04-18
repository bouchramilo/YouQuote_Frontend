import { useState, useEffect } from "react";
import RowCorbeille from "./../../components/RowCorbeille";

const SoftDelete = () => {
  // ********************************************************************************************
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/suppression", {
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

  // Loading ......
  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Chargement en cours...</p>
      </div>
    );
  }

  // message d'erreur et un button de ressayer
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
  // aucun suppression pour le moment
  if (quotes.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Aucune citation supprimer disponible</p>
      </div>
    );
  }
  // ********************************************************************************************
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded"
        id="menuButton"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <main className="flex-1 p-8 md:ml-64">
        <h1 className="text-3xl font-bold mb-8">Corbeille</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold">
                  Contenu
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold">
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold">
                  Supprimée par
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.map((quote) => (
                <RowCorbeille key={quote.id} data={quote} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default SoftDelete;
