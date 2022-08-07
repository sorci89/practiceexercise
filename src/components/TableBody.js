import { Fragment } from "react";

const TableBody = ({ invoices, columns }) => {
  return (
    <tbody>
      {invoices.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData =
                accessor === "payable_amount" ? (
                  "$" + Math.round(data[accessor])
                ) : accessor === "paid_amount" ? (
                  "$" + Math.round(data[accessor])
                ) : accessor === "date" ? (
                  new Date(data[accessor]).toLocaleDateString("en-GB")
                ) : accessor === "due" ? (
                  "$" + Math.round(data["payable_amount"] - data["paid_amount"])
                ) : accessor === "id" ? (
                  "#" + data[accessor]
                ) : accessor === "?" ? (
                  <Fragment>
                    <input type="checkbox"></input>
                  </Fragment>
                ) : (
                  data[accessor]
                );
              return (
                <td key={accessor} className={`table-cell ${accessor}`}>
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
