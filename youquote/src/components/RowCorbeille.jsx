import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../context/UserContext";

const RowCorbeille = ({ data }) => {
  // ******************************************************************************************************************************
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { userId, user, role } = useContext(Context);
  const navigate = useNavigate();

  // ******************************************************************************************************************************
  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-User-Id": userId,
      "X-User-Role": role,
    };
  };

  // ******************************************************************************************************************************
  const handleRestore = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`/api/suppression/${data.id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({
          action: "restore",
          user_id: userId,
          role: role,
        }),
      });

      // // console.log("RESPONSE ::: ", user.roles[0].name);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la restauration");
      }

      navigate(0);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
      alert("Erreur lors de la restauration de la citation");
    } finally {
      setIsProcessing(false);
    }
  };

  // ******************************************************************************************************************************
  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir supprimer définitivement cette citation ?"
      )
    ) {
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`/api/suppression/${data.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({
          action: "force-delete",
          user_id: userId,
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      navigate(0);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
      alert("Erreur lors de la suppression de la citation");
    } finally {
      setIsProcessing(false);
    }
  };

  // ******************************************************************************************************************************
  return (
    <tr>
      <td className="px-6 py-4">{data.content}</td>
      <td className="px-6 py-4">{data.user}</td>
      <td className="px-6 py-4">
        {new Date(data.deleted_at).toLocaleDateString("fr-FR")}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={handleRestore}
          className="text-green-600 hover:text-green-800 mr-2"
          disabled={isProcessing}
          title="Restaurer"
        >
          {isProcessing ? "⏳" : "♻️"}
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
          disabled={isProcessing}
          title="Supprimer définitivement"
        >
          {isProcessing ? "⏳" : "🗑️"}
        </button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </td>
    </tr>
  );
};

export default RowCorbeille;
