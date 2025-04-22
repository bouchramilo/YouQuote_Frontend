import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../context/UserContext";

const CardQuoteNotValid = ({ quote, onValidation, onDelete }) => {
  // ******************************************************************************************************************************
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { userId, user, role } = useContext(Context);
  const navigate = useNavigate();
  const userAuth = {
    user: user,
    user_id: userId,
    role: role,
  };

  // ******************************************************************************************************************************
  const handleValidate = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`/api/quotes/valider/${quote.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userAuth),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la validation");
      }

      onValidation?.(quote.id);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ******************************************************************************************************************************
  const handleDelete = async () => {
    // console.log("user connecter :::  ", user.roles[0].name);

    try {
      const response = await fetch(`/api/quotes/${quote.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userAuth),
      });
 

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      onDelete?.(quote.id);
    } catch (err) {
      setError(err.message);
    }
  };

  // ******************************************************************************************************************************
  const handleEdit = () => {
    navigate(`/quotes/edit/${quote.id}`);
  };

  // ******************************************************************************************************************************
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-500">ID: {quote.id}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            disabled={isProcessing}
            className="text-accent hover:text-primary disabled:opacity-50"
          >
            ✏️
          </button>

          <form onSubmit={handleValidate}>
            <input type="hidden" name="id_quote" value={quote.id} />
            <button
              type="submit"
              disabled={isProcessing}
              className="text-green-600 hover:text-green-800 disabled:opacity-50"
            >
              {isProcessing ? "..." : "✔️"}
            </button>
          </form>

          <button
            onClick={handleDelete}
            disabled={isProcessing}
            className="text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            🗑️
          </button>
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
      </div>

      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </div>
  );
};

export default CardQuoteNotValid;
