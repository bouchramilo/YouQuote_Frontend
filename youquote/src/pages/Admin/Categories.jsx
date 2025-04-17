import AddCategorie from "./../../components/tagCate/AddData";
import ListData from "./../../components/tagCate/ListData";

const Categories = () => {
  return (
    <div>
      <main className="flex-1 md:ml-64 p-6">
        <h1 className="text-3xl font-heading font-bold mb-6">
          Gérer les catégories
        </h1>

        <AddCategorie nameData="categories" />

        <ListData nameData="categories" />
      </main>
    </div>
  );
};

export default Categories;
