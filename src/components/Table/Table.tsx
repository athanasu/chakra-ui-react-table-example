import {
  Button,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  useTable,
  usePagination,
  useSortBy,
  useRowSelect,
  Column,
} from "react-table";
import React from "react";

import { RowCell, TableData, TableProps } from "./Table.types";
import { IndeterminateCheckbox } from "../IndeterminateCheckbox/IndeterminateCheckbox";
import { Pagination } from "../Pagination/Pagination";

export function Table({ data }: TableProps) {
  const columns: Column<TableData>[] = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "first",
        accessor: "first",
      },
      {
        Header: "last",
        accessor: ({ last }) => {
          return `${last}-test`;
        },
      },
      {
        Header: "action",
        accessor: ({ action }) => {
          return (
            <Flex>
              <Button onClick={() => action()} aria-label="action button">
                CTA
              </Button>
            </Flex>
          );
        },
      },
    ],
    []
  );

  const initialState = { pageSize: 5 };

  const tableInstance = useTable(
    { columns, data, initialState },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </>
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page
  } = tableInstance;

  return (
    <>
      <ChakraTable variant="simple" {...getTableProps()}>
        <Thead>
          {
            // Loop over the header rows
            headerGroups.map(({ getHeaderGroupProps, headers }) => (
              // Apply the header row props
              <Tr {...getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headers.map(
                    ({
                      getHeaderProps,
                      render,
                      getSortByToggleProps,
                      isSorted,
                      isSortedDesc,
                    }) => (
                      // Apply the header cell props
                      <Th {...getHeaderProps({ ...getSortByToggleProps() })}>
                        {/* Render the header */}
                        {render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {isSorted ? (
                            isSortedDesc ? (
                              <TriangleDownIcon />
                            ) : (
                              <TriangleUpIcon />
                            )
                          ) : null}
                        </span>
                      </Th>
                    )
                  )
                }
              </Tr>
            ))
          }
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell: RowCell) => {
                    // Apply the cell props
                    return (
                      <Td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </Td>
                    );
                  })
                }
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>

      {/* Show pagination */}
      <Pagination tableInstance={tableInstance} />
    </>
  );
}
