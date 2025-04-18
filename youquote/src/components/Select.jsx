import { useState, useEffect } from "react";

const Select = ({ nameData, multiple = true, onChange, selectedValues = [] }) => {
  const [donnee, setDonnee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(selectedValues);

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
  }, [nameData]);

  const handleSelectionChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-2">
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-2 text-red-500">
        <p>Erreur: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-primary text-white rounded text-sm"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (donnee.length === 0) {
    return (
      <div className="text-center py-2 text-gray-500">
        <p>Aucune donnée disponible</p>
      </div>
    );
  }

  return (
    <select
      multiple={multiple}
      value={multiple ? selectedOptions : selectedOptions[0] || ""}
      onChange={handleSelectionChange}
      className={`w-full pl-4 pr-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-accent ${
        multiple ? "min-h-[100px]" : ""
      }`}
    >
      {!multiple && <option value="">Sélectionnez une option</option>}
      {donnee.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;