import PropTypes from "prop-types";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useExpanded, useGridLayout, useTable } from "react-table";

import "./Table.css";

const Table = ({ columns, data, hasMore, next, renderExpanded }) => {
  const { getTableProps, prepareRow, headerGroups, rows } = useTable(
    {
      columns,
      data,
    },
    useGridLayout,
    useExpanded
  );

  return (
    <InfiniteScroll
      dataLength={rows.length}
      hasMore={hasMore}
      next={next}
      loader={<div id="loader">Loading...</div>}
    >
      <div {...getTableProps()} className="table">
        {headerGroups.map((headerGroup) => {
          return headerGroup.headers.map((column) => {
            return (
              <div {...column.getHeaderProps()} className="header">
                {column.render("Header")}
              </div>
            );
          });
        })}
        {rows.map((row) => {
          prepareRow(row);
          return (
            <>
              {row.cells.map((cell) => {
                return (
                  <div {...cell.getCellProps()} className="cell">
                    {cell.render("Cell")}
                  </div>
                );
              })}
              {row.isExpanded ? renderExpanded(row) : null}
            </>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
  renderExpanded: PropTypes.func,
};

Table.defaultProps = {
  hasMore: false,
  next: () => {},
  renderExpanded: () => {},
};

export default Table;
