export type TableInstanceProps = {
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageCount: number;
  pageOptions: number[];
  state: { pageIndex: number; pageSize: number };
  gotoPage(pageIndex: number): void;
  nextPage(): void;
  previousPage(): void;
  setPageSize(size: number): void;
};

export type TableInstance = {
  tableInstance: TableInstanceProps;
};
