export type TableInstanceProps = {
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageCount: number;
  pageOptions: number[];
  state: { pageIndex: number };
  gotoPage(pageIndex: number): void;
  nextPage(): void;
  previousPage(): void;
};

export type TableInstance = {
  tableInstance: TableInstanceProps;
};
