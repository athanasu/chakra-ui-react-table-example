export type TableData = {
  id: number;
  first: string;
  last: string;
  action: () => void;
};

export type TableProps = {
  data: TableData[];
};

export type RowCell = {
  getCellProps: () => JSX.IntrinsicAttributes;
  render: (arg0: string) => any;
};
