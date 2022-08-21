import { Fragment } from "react";
import styles from "./table.module.css";

const TableBody = ({ invoices, columns }) => {
  return (
    <tbody>
      {invoices &&
        invoices.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const highlightedCell = accessor === "id" ? "highlight" : "";
                const tData =
                  accessor === "payable_amount" ? (
                    "$" + Math.round(data[accessor])
                  ) : accessor === "paid_amount" ? (
                    "$" + Math.round(data[accessor])
                  ) : accessor === "date" ? (
                    new Date(data[accessor]).toLocaleDateString("en-GB")
                  ) : accessor === "due" ? (
                    "$" +
                    Math.round(data["payable_amount"] - data["paid_amount"])
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
                  <td
                    key={accessor}
                    className={`${styles["table-cell"]} ${styles[highlightedCell]}`}
                  >
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
