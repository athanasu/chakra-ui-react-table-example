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
import { useTable, usePagination, Column } from "react-table";
import React from "react";
import { TableData, TableProps } from "./Table.types";
import { Pagination } from "../Pagination/Pagination";

export const setColumnWidth = (columnId: string) => {
  switch (columnId) {
    case "first":
    case "last":
      return { width: "200px" };
    case "id":
    case "action":
      return { width: "150px" };
    default:
      return {};
  }
};

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

  const initialState = { pageSize: 20 };

  const tableInstance = useTable(
    { columns, data, initialState },
    usePagination
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
            headerGroups.map(({ getHeaderGroupProps, headers }: any) => (
              // Apply the header row props
              <Tr {...getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headers.map(({ getHeaderProps, render, id }: any) => (
                    // Apply the header cell props
                    <Th
                      {...getHeaderProps({
                        style: setColumnWidth(id),
                      })}
                    >
                      {
                        // Render the header
                        render("Header")
                      }
                    </Th>
                  ))
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
                  row.cells.map(
                    (cell: {
                      getCellProps: () => JSX.IntrinsicAttributes;
                      render: (arg0: string) => any;
                    }) => {
                      // Apply the cell props
                      return (
                        <Td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Td>
                      );
                    }
                  )
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
