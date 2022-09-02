type Primitive = string | number | boolean | undefined;

export type TableRow = Record<string, Primitive>;

export type TableData = Array<TableRow>;
