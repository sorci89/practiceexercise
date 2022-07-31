import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ invoices, handleSortingChange }) => {
  const columns = [
    { label: "Invoice ID", accessor: "id" },
    { label: "Date", accessor: "date" },
    { label: "Customer", accessor: "customer" },
    { label: "Payable Amount", accessor: "payable_amount" },
    { label: "Paid Amount", accessor: "paid_amount" },
    { label: "Due", accessor: "due" },
  ];

  return (
    <>
      <table className="table">
        <TableHead
          columns={columns}
          handleSortingChange={handleSortingChange}
        />
        <TableBody columns={columns} invoices={invoices} />
      </table>
    </>
  );
};

export default Table;
