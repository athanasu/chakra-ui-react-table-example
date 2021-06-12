import { Button, Flex, Text } from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { TableInstance } from "./Pagination.types";

export function Pagination({ tableInstance }: TableInstance) {
  const {
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex },
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
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

  return (
    <Flex
      data-testid="pagination"
      justifyContent="center"
      lineHeight="40px"
      p={10}
    >
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
  );
}
