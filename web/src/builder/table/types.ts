type Primitive = string | number | boolean | undefined;

export type TableRow = Record<string, Primitive>;

export type TableData = Array<TableRow>;

export interface PaginationResponse<Row> {
  data: Row[];
  paging: {
    current: number;
    total: number;
  };
}
