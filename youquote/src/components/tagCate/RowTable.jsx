import { useState } from "react";

const RowTable = ({ nameData, index, data, onEdit, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(data);
    }
  };

  const handleDeleteClick = async () => {
    if (
      !window.confirm(`Êtes-vous sûr de vouloir supprimer "${data.name}" ?`)
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/${nameData}/${data._id || data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la suppression");
      }

      if (onDeleteSuccess) {
        onDeleteSuccess(data._id || data.id);
      } else {
        window.location.reload();
      }
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(`Erreur lors de la suppression: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="border-b">
      <td className="px-6 py-4">{index}</td>
      <td className="px-6 py-4">{data.name}</td>
      <td className="px-6 py-4">
        <button
          onClick={handleEditClick}
          className="text-accent hover:text-opacity-80 mr-2"
          disabled={isDeleting}
          aria-label="Modifier"
        >
          ✏️
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-red-500 hover:text-opacity-80"
          disabled={isDeleting}
          aria-label="Supprimer"
        >
          {isDeleting ? (
            <span className="inline-block animate-spin">⌛</span>
          ) : (
            "❌"
          )}
        </button>
      </td>
    </tr>
  );
};

export default RowTable;
