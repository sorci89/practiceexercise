import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ invoices, setInvoices }) => {
  const columns = [
    { label: "Invoice ID", accessor: "id" },
    { label: "Date", accessor: "date" },
    { label: "Customer", accessor: "customer" },
    { label: "Payable Amount", accessor: "payable_amount" },
    { label: "Paid Amount", accessor: "paid_amount" },
    { label: "Due", accessor: "due" },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField === "date" || sortField === "payable_amount") {
      const sorted = [...invoices].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setInvoices(sorted);
    }
  };

  return (
    <>
      <table className="table">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} invoices={invoices} />
      </table>
    </>
  );
};

export default Table;
