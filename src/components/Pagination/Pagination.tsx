import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { TableInstance } from "./Pagination.types";
import React from "react";

export function Pagination({ tableInstance }: TableInstance) {
  const {
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex, pageSize },
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = tableInstance;

  const navigationStyles = {
    mr: "5px",
    ml: "5px",
  };

  const textStyles = {
    fontSize: 18,
    ml: "15px",
    mr: "15px",
  };

  const onChangeRowsPerPage = React.useCallback(
    (e) => {
      setPageSize(parseInt(e.target.value));
    },
    [setPageSize]
  );

  return (
    <Flex
      data-testid="pagination"
      justifyContent="center"
      lineHeight="40px"
      p={10}
    >
      <Flex>
        <FormControl>
          <Flex flexDirection="row">
            <FormLabel>Rows per page:</FormLabel>
            <Select
              value={pageSize.toString()}
              onChange={onChangeRowsPerPage}
              w="80px"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Select>
          </Flex>
        </FormControl>
      </Flex>
      <Spacer />
      <Flex>
        <Button
          data-testid="go-to-first-page"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          {...navigationStyles}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          data-testid="go-to-previous-page"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          {...navigationStyles}
        >
          <ChevronLeftIcon />
        </Button>
        <Text {...textStyles}>
          Page {pageIndex + 1} of {pageOptions.length}
        </Text>
        <Button
          data-testid="go-to-next-page"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          {...navigationStyles}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          data-testid="go-to-last-page"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          {...navigationStyles}
        >
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
