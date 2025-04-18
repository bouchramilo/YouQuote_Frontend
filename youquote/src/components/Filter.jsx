const Filter = () => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select className="p-2 rounded border border-accent">
        <option value="">Filtrer par utilisateur</option>
      </select>
      <select className="p-2 rounded border border-accent">
        <option value="">Filtrer par statut</option>
        <option value="pending">En attente</option>
        <option value="accepted">Accepté</option>
        <option value="rejected">Rejeté</option>
      </select>
    </div>
  );
};

export default Filter;
