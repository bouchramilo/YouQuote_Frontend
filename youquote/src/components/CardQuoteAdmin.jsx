import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "./../context/UserContext";

const CardQuoteAdmin = ({ quote, onDelete, isLiked: initialIsLiked }) => {
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { userId, user, role } = useContext(Context);
  const navigate = useNavigate();



  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/quotes/${quote.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: user,
          user_id: userId,
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      onDelete?.(quote.id);
      // navigate(0); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    navigate(`/quotes/edit/${quote.id}`);
  };


  return (
    <div
      className={`mb-4 rounded-lg shadow p-6 ${
        !quote.is_valide
          ? "bg-secondary/25 border-l-4 border-red-500"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-500">Par : {quote.user}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-accent hover:text-primary disabled:opacity-50"
          >
            ✏️
          </button>{" "}
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            🗑️
          </button>{" "}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-zen mb-2">"{quote.content}"</p>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <span 
            // onClick={handleLike}
            className={`mr-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}
          >
            ❤️ {quote.likes_count} 
          </span>
          <Link to={`/likes/${quote.id}`} className="hover:underline hover:text-accent">Likes</Link>
          </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">⭐ {quote.favorites_count}</span>
          <Link to={`/favories/${quote.id}`} className="hover:underline hover:text-accent">Favories</Link>
          </div>
      </div>

      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </div>
  );
};

export default CardQuoteAdmin;