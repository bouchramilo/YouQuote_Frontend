const RowTable = ({ index, data }) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 ">{ index }</td>
      <td className="px-6 py-4">{ data.name }</td>
      <td className="px-6 py-4">
        <button className="text-accent hover:text-opacity-80 mr-2">✏️</button>
        <button className="text-red-500 hover:text-opacity-80">❌</button>
      </td>
    </tr>
  );
};

export default RowTable;
