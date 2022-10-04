import { render, screen } from "@testing-library/react";
import TableBody from "./TableBody";
import { within } from "@testing-library/dom";

const columns = [
  { label: <input type="checkbox" />, accessor: "?" },
  { label: "Invoice ID", accessor: "id" },
  { label: "Date", accessor: "date" },
  { label: "Customer", accessor: "customer" },
  { label: "Payable Amount", accessor: "payable_amount" },
  { label: "Paid Amount", accessor: "paid_amount" },
  { label: "Due", accessor: "due" },
];

test("renders table body with invoices", () => {
  const invoices = [];
  render(<TableBody invoices={invoices} />);
  const tableBodyElement = screen.getByRole("rowgroup");
  expect(tableBodyElement).toBeDefined();
});

test("renders table body without invoices", () => {
  render(<TableBody />);
  const tableBodyElement = screen.getByRole("rowgroup");
  expect(tableBodyElement).toBeDefined();
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
  render(<TableBody invoices={invoices} columns={columns} />);
  const tableBodyElement = screen.getByRole("rowgroup");
  expect(tableBodyElement).toBeDefined();

  const tableRow = screen.getAllByRole("row");
  expect(tableRow).toHaveLength(2);
});

test("it renders all data from invoices array", () => {
  const invoices = [
    {
      id: "1",
      date: "2022.06.28",
      customer: "XY",
      payable_amount: "200",
      paid_amount: "200",
    },
  ];

  render(<TableBody invoices={invoices} columns={columns} />);
  // const tableRow = screen.getAllByRole("row");
  const tableColumnheaders = screen.getAllByRole("cell");

  // select the first row [0]
  // find all table cells -> td -> should return multiple cells(array)
  // expect first row/first cell rows[0] cells[0] to be something/or have some value

  //find table cell that matches some content

  expect(tableColumnheaders[1].textContent).toEqual("#" + invoices[0].id);
  expect(tableColumnheaders[2].textContent).toEqual("28/06/2022");
  expect(tableColumnheaders[3].textContent).toEqual("XY");
  expect(tableColumnheaders[4].textContent).toEqual(
    "$" + invoices[0].payable_amount
  );
  expect(tableColumnheaders[5].textContent).toEqual(
    "$" + invoices[0].paid_amount
  );
});

test("it renders id data with # and classname highlight", () => {
  const invoices = [
    {
      id: "1",
      date: "2022.06.28",
    },
  ];

  render(<TableBody invoices={invoices} columns={columns} />);
  const firstTableRow = screen.getAllByRole("row")[0];
  const tableColumnheaders = screen.getAllByRole("cell");

  expect(within(firstTableRow).getAllByRole("cell")[1].textContent).toEqual(
    "#1"
  );
  expect(tableColumnheaders[1].className).toEqual("table-cell " + "highlight");
  expect(tableColumnheaders[2].className).toEqual("table-cell " + "");
});

test("it renders payable and paid amounts rounded", () => {
  const invoices = [
    {
      payable_amount: "200.99",
      paid_amount: "200.34",
    },
  ];

  render(<TableBody invoices={invoices} columns={columns} />);
  // const tableRow = screen.getAllByRole("row");
  const tableColumnheaders = screen.getAllByRole("cell");
  // const tableColumnheaders = tableRow[0].children;

  expect(tableColumnheaders[4].textContent).toEqual("$201");
  expect(tableColumnheaders[5].textContent).toEqual("$200");
});

test("it renders due amount from payable and paid amount", () => {
  const invoices = [
    {
      payable_amount: "200.99",
      paid_amount: "150.34",
    },
  ];

  render(<TableBody invoices={invoices} columns={columns} />);
  // const tableRow = screen.getAllByRole("row");
  const tableColumnheaders = screen.getAllByRole("cell");
  // const tableColumnheaders = tableRow[0].children;

  expect(tableColumnheaders[6].textContent).toEqual("$51");
});

test("it renders a checkbox input at first cell of row", () => {
  const invoices = [
    {
      id: "1",
    },
  ];

  render(<TableBody invoices={invoices} columns={columns} />);
  // const tableRow = screen.getAllByRole("row");
  const tableColumnheaders = screen.getAllByRole("cell");
  // const tableColumnheaders = tableRow[0].children;

  expect(tableColumnheaders[0].innerHTML).toEqual('<input type="checkbox">');
});
