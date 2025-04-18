import { useState, useEffect } from "react";
import Input from "../Input";

const UpdateData = ({ dataToUpdate, onUpdate, onCancel, nameData }) => {
  const [formData, setFormData] = useState({ name: "", id: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dataToUpdate) {
      setFormData({
        name: dataToUpdate.name,
        id: dataToUpdate.id || dataToUpdate._id,
      });
    }
  }, [dataToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`/api/${nameData}/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: formData.name }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          throw new Error(data.message || "Erreur lors de la mise à jour");
        }
        return;
      }

      if (onUpdate) {
        onUpdate(data.data || data);
      }
      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  if (!dataToUpdate) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Modifier la {nameData}</h2>

      {errors.general && (
        <div className="mb-4 text-red-500 text-sm">{errors.general}</div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-grow">
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            name="name"
            hasError={!!errors.name}
            errorMessage={errors.name}
            type="text"
            placeholder={`Nouveau nom de la ${nameData}`}
            disabled={isSubmitting}
            required
          />
          <input type="hidden" name="id" value={formData.id} />
        </div>

        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting || !formData.name.trim()}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                En cours...
              </span>
            ) : (
              "Mettre à jour"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateData;
