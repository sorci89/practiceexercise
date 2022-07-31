const TableHead = ({ columns, handleSortingChange }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          return (
            <th key={accessor} onClick={() => handleSortingChange(accessor)}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
