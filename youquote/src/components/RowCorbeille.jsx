const RowCorbeille = ({ key, data }) => {
  return (
    <tr>
      <td className="px-6 py-4">{ data.content }</td>
      <td className="px-6 py-4">{ data.user }</td>
      <td className="px-6 py-4">Admin</td>
      <td className="px-6 py-4">{ data.deleted_at }</td>
      <td className="px-6 py-4">
        <button className="text-green-600 hover:text-green-800 mr-2">
          ♻️
        </button>
        <button className="text-red-600 hover:text-red-800">
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default RowCorbeille;
