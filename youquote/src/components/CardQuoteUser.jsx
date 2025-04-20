import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../context/UserContext";

const CardQuoteUser = ({ quote, onDelete }) => {
  // ******************************************************************************************************************************
  const [error, setError] = useState(null);
  const { userId, user, role } = useContext(Context);
  const navigate = useNavigate();
  const userAuth = {
    user: user,
    user_id: userId,
    role: role,
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
      // const data = await response.json();
      // console.log("le user depuis le backent : " , data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      onDelete?.(quote.id);
      navigate(0);
    } catch (err) {
      setError(err.message);
    }
  };

  // ******************************************************************************************************************************
  const AjouterLike = async () => {
    // console.log("user connecter :::  ", user.roles[0].name);

    try {
      const donnee = {
        user: user,
        user_id: userId,
        role: role,
        quote_id: quote.id,
      };
      const response = await fetch(`/api/likes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(donnee),
      });
      const data = await response.json();
      console.log("data liker like ", data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      onDelete?.(quote.id);
      navigate(0);
    } catch (err) {
      setError(err.message);
    }
  };

  // ******************************************************************************************************************************
  const AddFavorite = async () => {
    // console.log("user connecter :::  ", user.roles[0].name);

    try {
      const donnee = {
        user: user,
        user_id: userId,
        role: role,
        quote_id: quote.id,
      };
      const response = await fetch(`/api/favories`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(donnee),
      });
      const data = await response.json();
      console.log("data liker like ", data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      onDelete?.(quote.id);
      navigate(0);
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
    <div
      className={`mb-4 rounded-lg shadow p-6 flex flex-col justify-between ${
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

      <div className="space-y-2 text-sm">
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

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <button className="text-gray-500 mr-2" onClick={AjouterLike}>
              {" "}
              <svg
                className={quote.is_liked ? "h-5 w-5 text-red-600" : "h-5 w-5"}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18l-1-1.1C4.7 13.6 2 11 2 7.5c0-2.8 2.2-5 5-5 1.7 0 3.2.8 4 2 .8-1.2 2.3-2 4-2 2.8 0 5 2.2 5 5 0 3.5-2.7 6.1-7 9.4L10 18z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <span>{quote.likes_count} likes</span>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 mr-2" onClick={AddFavorite}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  quote.is_favorite ? "h-5 w-5 text-yellow-600" : "h-5 w-5"
                }
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.913c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.89a1 1 0 00-1.176 0l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.101c-.783-.57-.38-1.81.588-1.81h4.913a1 1 0 00.95-.69l1.518-4.674z"
                />
              </svg>
            </button>
            <span>{quote.favorites_count} favoris</span>
          </div>
        </div>
      </div>
      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </div>
  );
};

export default CardQuoteUser;
