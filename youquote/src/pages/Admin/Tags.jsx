import AddTag from './../../components/tagCate/AddData'
import ListData from './../../components/tagCate/ListData'

const Tags = () => {
  return (
    <div>
      <main className="flex-1 md:ml-64 p-6">
        <h1 className="text-3xl font-heading font-bold mb-6">
          Gérer les tags
        </h1>

        <AddTag nameData="tags" />

        <ListData nameData="tags" />
      </main>
    </div>
  );
};

export default Tags;
