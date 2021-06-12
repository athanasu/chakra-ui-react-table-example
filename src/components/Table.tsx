import {
  Button,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { useTable, usePagination, Column } from "react-table";
import React from "react";

// import { TableProps } from "./Table.types";

export const setColumnWidth = (id: string) => {
  switch (id) {
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

export function Table({ data }: any) {
  const onEdit = React.useCallback(() => {
    console.log("onEdit");
  }, []);

  const columns: Column<{
    id: number;
    first: string;
    last: string;
    action: () => void;
  }>[] = React.useMemo(
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
        accessor: () => {
          return (
            <Flex>
              <Button
                onClick={() => onEdit()}
                aria-label="Edit translation button"
              >
                Edit
              </Button>
            </Flex>
          );
        },
      },
    ],
    [onEdit]
  );

  const tableInstance = useTable({ columns, data }, usePagination);

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
    </>
  );
}
