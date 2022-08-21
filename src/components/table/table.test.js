import { fireEvent, render, screen } from "@testing-library/react";
import Table from "./Table";
import TableHead from "./TableHead";

const invoices = [];

test("renders the table", () => {
  render(<Table invoices={invoices} />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeDefined();
});

test("it tenders the table without invoices", () => {
  render(<Table />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeDefined();
});

test("it correctly renders the table head", () => {
  render(<Table />);
  const tableRows = screen.getAllByRole("row");
  expect(tableRows).toHaveLength(1);

  const tableHeaderCells = screen.getAllByRole("columnheader");
  expect(tableHeaderCells).toHaveLength(7);
});

test("it renders the table with 2 invoices", () => {
  const invoices = [
    {
      id: "1",
    },
    {
      id: "2",
    },
  ];
  render(<Table invoices={invoices} />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeDefined();

  const tableRow = screen.getAllByRole("row");
  expect(tableRow).toHaveLength(3);
});

const columns = [
  { label: <input type="checkbox" />, accessor: "?" },
  { label: "Invoice ID", accessor: "id" },
  { label: "Date", accessor: "date" },
  { label: "Customer", accessor: "customer" },
  { label: "Payable Amount", accessor: "payable_amount" },
  { label: "Paid Amount", accessor: "paid_amount" },
  { label: "Due", accessor: "due" },
];

test("it will fire sorting change when click", () => {
  const handleSortingChange = (accessor) => {
    return accessor;
  };
  const handleClick = jest.fn(handleSortingChange);

  render(
    <table>
      <TableHead columns={columns} handleSortingChange={handleClick} />
    </table>
  );
  const cellElement = screen.getByText("Invoice ID");
  fireEvent.click(cellElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results[0].value).toBe("id");

  fireEvent.click(screen.getByText("Date"));

  expect(handleClick).toHaveBeenCalledTimes(2);
  expect(handleClick.mock.results[1].value).toBe("date");
});

test("it will fire sorting change when click for the table", () => {
  const handleSortingChange = (accessor) => {
    return accessor;
  };
  const handleClick = jest.fn(handleSortingChange);

  render(<Table handleSortingChange={handleClick} />);
  const cellElement = screen.getByText("Invoice ID");
  fireEvent.click(cellElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results[0].value).toBe("id");

  fireEvent.click(screen.getByText("Date"));

  expect(handleClick).toHaveBeenCalledTimes(2);
  expect(handleClick.mock.results[1].value).toBe("date");
});
