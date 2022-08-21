import { render, screen, fireEvent } from "@testing-library/react";
import TableHead from "./TableHead";

const columns = [
  { label: <input type="checkbox" />, accessor: "?" },
  { label: "Invoice ID", accessor: "id" },
  { label: "Date", accessor: "date" },
  { label: "Customer", accessor: "customer" },
  { label: "Payable Amount", accessor: "payable_amount" },
  { label: "Paid Amount", accessor: "paid_amount" },
  { label: "Due", accessor: "due" },
];

test("renders table head", () => {
  render(<TableHead columns={columns} />);
  const tableHeadElement = screen.getByRole("rowgroup");
  expect(tableHeadElement).toBeDefined();
});

test("renders table head without columns", () => {
  render(<TableHead />);
  const tableHeadElement = screen.getByRole("rowgroup");
  expect(tableHeadElement).toBeDefined();

  const tableHeadRow = screen.getAllByRole("row");
  expect(tableHeadRow).toHaveLength(1);
});

test("it should have 1 rowheader", () => {
  render(<TableHead />);

  const tableHeadRow = screen.getAllByRole("row");
  expect(tableHeadRow).toHaveLength(1);
});

test("it should have 7 columnheaders", () => {
  render(<TableHead columns={columns} />);

  const tableHeadColumns = screen.getAllByRole("columnheader");

  expect(tableHeadColumns).toHaveLength(7);
});

test("table head column cells should be the label texts", () => {
  render(<TableHead columns={columns} />);

  const tableHeadColumns = screen.getAllByRole("columnheader");

  expect(tableHeadColumns[1].textContent).toEqual(columns[1].label);
  expect(tableHeadColumns[2].textContent).toEqual(columns[2].label);
  expect(tableHeadColumns[3].textContent).toEqual(columns[3].label);
  expect(tableHeadColumns[4].textContent).toEqual(columns[4].label);
  expect(tableHeadColumns[5].textContent).toEqual(columns[5].label);
  expect(tableHeadColumns[6].textContent).toEqual(columns[6].label);
});

test("first columnheader cells should contain input element, checkbox type", () => {
  render(<TableHead columns={columns} />);

  const tableHeadColumns = screen.getAllByRole("columnheader");

  expect(tableHeadColumns[0].innerHTML).toEqual('<input type="checkbox">');
});

test("it will fire sorting change when click", () => {
  const handleSortingChange = (accessor) => {
    return accessor;
  };
  const handleClick = jest.fn(handleSortingChange);

  render(<TableHead columns={columns} handleSortingChange={handleClick} />);
  const cellElement = screen.getByText("Invoice ID");
  fireEvent.click(cellElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results[0].value).toBe("id");

  fireEvent.click(screen.getByText("Date"));

  expect(handleClick).toHaveBeenCalledTimes(2);
  expect(handleClick.mock.results[1].value).toBe("date");
});
