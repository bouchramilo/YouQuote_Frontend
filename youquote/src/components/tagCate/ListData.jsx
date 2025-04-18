import RowTable from "./RowTable";
import UpdateData from "./UpdateData";
import { useState, useEffect } from "react";

const ListData = ({ nameData }) => {
  const [donnee, setDonnee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchDonnee = async () => {
      try {
        const response = await fetch(`/api/${nameData}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        console.log(`${nameData} response : `, response);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Error ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        const receivedData = Array.isArray(data) ? data : data.data || [];
        setDonnee(receivedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDonnee();
  }, [refreshKey, nameData]);

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleUpdateSuccess = (updatedItem) => {
    setDonnee(
      donnee.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
    setEditingItem(null);
    // Optionnel: recharger les données depuis le serveur
    // setRefreshKey(prev => prev + 1);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDeleteSuccess = (deletedId) => {
    setDonnee(donnee.filter((item) => item._id !== deletedId));
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (donnee.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No {nameData} available</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Formulaire de modification */}
      {editingItem && (
        <div className="p-4 border-b">
          <UpdateData
            dataToUpdate={editingItem}
            onUpdate={handleUpdateSuccess}
            onCancel={handleCancelEdit}
            nameData={nameData}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donnee.map((data, index) => (
              <RowTable
                key={data._id || index}
                index={index + 1}
                data={data}
                onEdit={handleEditClick}
                onDeleteSuccess={handleDeleteSuccess}
                nameData={nameData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListData;
