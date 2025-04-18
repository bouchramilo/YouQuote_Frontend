import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "./../components/Select";
import Label from "./../components/Label";
import { Context } from "./../context/UserContext";

const AddQuote = () => {
    // *************************************************************************************************************************************
  // États du formulaire
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Context et navigation
  const navigate = useNavigate();
  const { userId } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validation rapide côté client
      if (!content.trim()) {
        setErrors({ content: "Le contenu de la citation est requis" });
        return;
      }

      const newQuote = {
        content: content.trim(),
        categories: selectedCategories,
        tags: selectedTags,
        user_id: userId,
      };

      const response = await fetch(`/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newQuote),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        throw new Error(data.message || "Erreur lors de l'ajout de la citation");
      }

      navigate("/", { state: { successMessage: "Citation ajoutée avec succès!" } });
    } catch (error) {
      console.error("Erreur:", error);
      if (!errors.general) {
        setErrors(prev => ({ ...prev, general: error.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };
// *************************************************************************************************************************************
  return (
    <main className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ajouter une citation</h1>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Champ Citation */}
          <div className="mb-6">
            <Label htmlFor="content" labelname="Citation" required />
            <textarea
              id="content"
              className={`resize-none w-full p-4 border-2 rounded-lg focus:outline-none ${
                errors.content ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              aria-invalid={!!errors.content}
              aria-describedby="content-error"
            />
            {errors.content && (
              <p id="content-error" className="text-red-500 text-sm mt-1">
                {errors.content}
              </p>
            )}
          </div>

          {/* Champ Catégories */}
          <div className="mb-6">
            <Label htmlFor="categories" labelname="Catégories" />
            <Select
              nameData="categories"
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
              multiple
              aria-describedby="categories-error"
            />
            {errors.categories && (
              <p id="categories-error" className="text-red-500 text-sm mt-1">
                {errors.categories}
              </p>
            )}
          </div>

          {/* Champ Tags */}
          <div className="mb-8">
            <Label htmlFor="tags" labelname="Tags" />
            <Select
              nameData="tags"
              selectedValues={selectedTags}
              onChange={setSelectedTags}
              multiple
              aria-describedby="tags-error"
            />
            {errors.tags && (
              <p id="tags-error" className="text-red-500 text-sm mt-1">
                {errors.tags}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Link
              to="/"
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publication...
                </span>
              ) : "Publier"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddQuote;