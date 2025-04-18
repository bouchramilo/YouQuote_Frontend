import Input from "../Input";
import { useState } from "react";

const AddData = ({ onCategoryAdded, nameData }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // // console.log("form data categorie : ", formData);

    try {
      const response = await fetch(`/api/${nameData}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      // // console.log("response add categorie : ", response);

      const data = await response.json();

      // // console.log("data add categorie : ", data);

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          throw new Error(data.message || "Erreur lors de l'ajout");
        }
        return;
      }

      setFormData({ name: "" });
      if (onCategoryAdded) onCategoryAdded(data.data);
      window.location.reload();
      // // console.log("Catégorie ajoutée avec succès");
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Ajouter une {nameData}</h2>
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
            placeholder={`Nom de la ${nameData}`}
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
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
              Ajout...
            </span>
          ) : (
            "Ajouter"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddData;
