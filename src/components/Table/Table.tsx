import {
  Button,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Checkbox,
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

  const initialState = { pageSize: 5 };

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }: any, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || (defaultRef as any);

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
          {/* <Checkbox type="checkbox" ref={resolvedRef} {...rest} /> */}
        </>
      );
    }
  );

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
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
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
            headerGroups.map(({ getHeaderGroupProps, headers }: any) => (
              // Apply the header row props
              <Tr {...getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headers.map(
                    ({
                      getHeaderProps,
                      render,
                      id,
                      getSortByToggleProps,
                      isSorted,
                      isSortedDesc,
                    }: any) => (
                      // Apply the header cell props
                      <Th
                        {...getHeaderProps({
                          style: setColumnWidth(id),
                          ...getSortByToggleProps(),
                        })}
                      >
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
                          ) : (
                            ""
                          )}
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
