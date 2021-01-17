import {
  faLayerGroup,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  defaultOrderByFn,
  useExpanded,
  useGridLayout,
  useGroupBy,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

import "./Table.css";

const Table = ({
  columns,
  data,
  hasMore,
  next,
  renderExpanded,
  setSelectedRowIds,
}) => {
  const {
    getTableProps,
    prepareRow,
    headerGroups,
    rows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      autoResetGroupBy: false,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetSelectedRows: false,
      defaultColumn: {
        disableGroupBy: true,
      },
      getRowId: useCallback((row) => {
        return row.id;
      }, []),
      aggregations: useMemo(() => {
        return {
          firstLast: (leafValues) => {
            const values = [...leafValues].sort();
            if (values.length === 1) {
              return values[0];
            }
            return `${values[0]}..${values.slice(-1)}`;
          },
        };
      }, []),
      isMultiSortEvent: useCallback(() => {
        return true;
      }, []),
      orderByFn: useCallback((arr, funcs, dirs) => {
        return defaultOrderByFn(arr, funcs.reverse(), dirs.reverse());
      }, []),
    },
    useGridLayout,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    useCallback((hooks) => {
      hooks.getTableProps.push((props, { instance }) => {
        const columnWidths = instance.visibleColumns.map((column) => {
          const index = instance.allColumns.findIndex((col) => {
            return col.id === column.id;
          });
          const width = instance.state.gridLayout.columnWidths[index];
          if (width === `auto`) {
            return column.width || `auto`;
          }
          return width;
        });
        return [
          props,
          {
            style: {
              display: `grid`,
              gridTemplateColumns: columnWidths.join(` `),
            },
          },
        ];
      });
      hooks.getToggleAllRowsSelectedProps.push((props, { instance }) => {
        return [
          props,
          {
            onChange: (e) => {
              instance.toggleAllRowsSelected(e.target.checked);
            },
            style: {
              cursor: "pointer",
            },
            checked: instance.isAllRowsSelected,
            title: "Toggle All Rows Selected",
            indeterminate: Boolean(
              !instance.isAllRowsSelected &&
                instance.initialRows.some(({ id }) => {
                  return instance.state.selectedRowIds[id];
                })
            ),
          },
        ];
      });
    }, [])
  );

  useEffect(() => {
    setSelectedRowIds(Object.keys(selectedRowIds));
  }, [setSelectedRowIds, selectedRowIds]);

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
  setSelectedRowIds: PropTypes.func,
};

Table.defaultProps = {
  hasMore: false,
  next: () => {},
  renderExpanded: () => {},
  setSelectedRowIds: () => {},
};

export default Table;
