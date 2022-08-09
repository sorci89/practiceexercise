import TableBody from "./TableBody";
import TableHead from "./TableHead";
import styles from "../table/table.module.css";

const Table = ({ invoices, handleSortingChange }) => {
  const columns = [
    { label: <input type="checkbox" />, accessor: "?" },
    { label: "Invoice ID", accessor: "id" },
    { label: "Date", accessor: "date" },
    { label: "Customer", accessor: "customer" },
    { label: "Payable Amount", accessor: "payable_amount" },
    { label: "Paid Amount", accessor: "paid_amount" },
    { label: "Due", accessor: "due" },
  ];

  return (
    <>
      <table className={styles.table}>
        <TableHead
          columns={columns}
          handleSortingChange={handleSortingChange}
        />
        {invoices && <TableBody columns={columns} invoices={invoices} />}
      </table>
    </>
  );
};

export default Table;
