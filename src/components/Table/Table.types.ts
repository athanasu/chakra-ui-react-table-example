export type TableData = {
  id: number;
  first: string;
  last: string;
  action: () => void;
};

export type TableProps = {
  data: TableData[];
};
