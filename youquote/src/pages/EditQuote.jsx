import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "./../context/UserContext";
import Select from "./../components/Select";
import Label from "./../components/Label";

const EditQuote = () => {
  // *************************************************************************************************************************************
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, role } = useContext(Context);

  const [citation, setCitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   *************************************************************************************************************************************
  // récupérer la citation à modifier
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/quotes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const quoteData = data.data || data;

        setCitation(quoteData);
        setContent(quoteData.content);
        setSelectedCategories(quoteData.categories?.map((c) => c.id) || []);
        setSelectedTags(quoteData.tags?.map((t) => t.id) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  //   *************************************************************************************************************************************
  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      if (!content.trim()) {
        setErrors({ content: "Le contenu de la citation est requis" });
        return;
      }

      const response = await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: content.trim(),
          categories: selectedCategories,
          tags: selectedTags,
          user_id: userId,
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification");
      }

      navigate(-1, {
        state: { successMessage: "Citation modifiée avec succès!" },
      });
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };
  //   *************************************************************************************************************************************
  const Annuler = (e) => {
    e.preventDefault();
    navigate(-1);
  }


  //   *************************************************************************************************************************************
  //   *************************************************************************************************************************************
  if (loading) return <div className="text-center p-6">Chargement...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;
  if (!citation)
    return <div className="text-center p-6">Citation introuvable</div>;

  //   *************************************************************************************************************************************
  return (
    <div className="my-6 mx-auto bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Modifier la citation</h1>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label htmlFor="content" labelname="Citation" required />
          <textarea
            id="content"
            className={`resize-none w-full p-4 border-2 rounded-lg focus:outline-none ${
              errors.content
                ? "border-red-500"
                : "border-2 border-secondary rounded-lg focus:outline-none focus:border-accent"
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

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            onClick={Annuler}
            className="px-4 py-2 rounded border-2 border-secondary text-gray-700 hover:bg-accent/10 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded bg-primary text-white hover:bg-secondary transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuote;
