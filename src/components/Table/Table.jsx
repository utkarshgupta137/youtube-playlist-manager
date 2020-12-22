import PropTypes from "prop-types";
import React from "react";
import { useGridLayout, useTable } from "react-table";

import "./Table.css";

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useGridLayout
  );

  return (
    <div {...getTableProps()} className="table">
      {headerGroups.map((headerGroup) => {
        return headerGroup.headers.map((column) => {
          return (
            <div
              key={column.id}
              {...column.getHeaderProps()}
              className="header"
            >
              {column.render("Header")}
            </div>
          );
        });
      })}
      {rows.map((row) => {
        return (
          prepareRow(row) ||
          row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="cell">
                {cell.render("Cell")}
              </div>
            );
          })
        );
      })}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
