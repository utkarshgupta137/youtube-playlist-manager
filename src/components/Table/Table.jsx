import {
  faLayerGroup,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useExpanded,
  useGridLayout,
  useGroupBy,
  useSortBy,
  useTable,
  defaultOrderByFn,
} from "react-table";

import "./Table.css";

const Table = ({ columns, data, hasMore, next, renderExpanded }) => {
  const { getTableProps, prepareRow, headerGroups, rows } = useTable(
    {
      columns,
      data,
      autoResetGroupBy: false,
      autoResetSortBy: false,
      autoResetExpanded: false,
      defaultColumn: {
        disableGroupBy: true,
      },
      stateReducer: (newState, action, prevState, instance) => {
        const cols = instance.visibleColumns ?? instance.columns;
        return {
          ...newState,
          gridLayout: {
            columnWidths: cols.map((column) => {
              return column.width || "auto";
            }),
          },
        };
      },
      aggregations: {
        firstLast: (leafValues) => {
          const values = [...leafValues].sort();
          if (values.length === 1) {
            return values[0];
          }
          return `${values[0]}..${values.slice(-1)}`;
        },
      },
      isMultiSortEvent: () => {
        return true;
      },
      orderByFn: (arr, funcs, dirs) => {
        return defaultOrderByFn(arr, funcs.reverse(), dirs.reverse());
      },
    },
    useGridLayout,
    useGroupBy,
    useSortBy,
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
                {column.canSort ? (
                  <span {...column.getSortByToggleProps()}>
                    <FontAwesomeIcon
                      icon={
                        column.isSorted
                          ? column.isSortedDesc
                            ? faSortDown
                            : faSortUp
                          : faSort
                      }
                      pull="right"
                      style={{ marginTop: "0.1rem" }}
                    />
                  </span>
                ) : null}
                {column.canGroupBy ? (
                  <span {...column.getGroupByToggleProps()}>
                    <FontAwesomeIcon
                      icon={faLayerGroup}
                      color={column.isGrouped ? "#ff0000" : null}
                      pull="right"
                      style={{ marginTop: "0.1rem" }}
                    />
                  </span>
                ) : null}
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
                    {cell.isGrouped ? (
                      <>
                        {cell.render("Cell")} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      cell.render("Aggregated")
                    ) : cell.isPlaceholder ? null : (
                      cell.render("Cell")
                    )}
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
