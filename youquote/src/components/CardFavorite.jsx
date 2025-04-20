import { useNavigate } from "react-router-dom";
// import { useState, useContext } from "react";
// import { Context } from "./../context/UserContext";

const CardFavorite = ({ quote, user_id, onRemove }) => {
  const navigate = useNavigate();
 

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const onRemoveFavorite = async () => {
    try {
      const response = await fetch(`/api/favories/${quote.favori_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      // const data = await response.json();
      // console.log("Favori supprimé", data);

      if (onRemove) {
        onRemove(quote.favori_id);
      }
      navigate(0);
    } catch (err) {
      alert(err.message);
    }
  };

  // ******************************************************************************************************************************
  const AjouterLike = async () => {
    console.log("user connecter :::  ", quote.citation.id);

    try {
      const donnee = {
        // user: user,
        user_id: user_id,
        // role: role,
        quote_id: quote.citation.id,
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

      navigate(0);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-500">Par {quote.citation.user}</span>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={onRemoveFavorite}
        >
          ❌ Retirer
        </button>
      </div>

      <p className="text-lg font-zen mb-4">"{quote.citation.content}"</p>

      <div className="mb-4">
        <h3 className="text-sm font-bold mb-2">Catégories</h3>
        <div className="flex flex-wrap gap-2">
          <span className="flex flex-wrap gap-1">
            {quote.citation.categories.map((cate, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-secondary rounded-full text-xs"
              >
                {cate}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <button className="text-gray-500 mr-2" onClick={AjouterLike}>
            {" "}
            <svg
              className={quote.citation.is_liked ? "h-5 w-5 text-red-600" : "h-5 w-5"}
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
          <span>{quote.citation.likes_count} likes</span>
        </div>
        <span className="text-sm text-gray-500">
          Ajouté le {formatDate(quote.added_at)}
        </span>
      </div>
    </div>
  );
};

export default CardFavorite;
