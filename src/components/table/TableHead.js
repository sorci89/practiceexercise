import styles from './table.module.css';

const TableHead = ({ columns, handleSortingChange }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          return (
            <th key={accessor} onClick={() => handleSortingChange(accessor)} className={styles['table-head-cell']}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
