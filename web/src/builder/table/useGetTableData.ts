import React from 'react';
import { getTableDataAsync } from './tableActions';
import { useTableContext } from './TableContext';
import { PaginationResponse, TableData, TableRow } from './types';

const getTableDataApi = (
  listUrl: string,
  options: {
    limit: number;
    page: number;
  }
): Promise<PaginationResponse<TableRow>> => {
  return fetch(
    `${listUrl}?${new URLSearchParams({
      limit: options.limit.toString(),
      page: options.page.toString(),
    })}`,
    {}
  ).then((res) => res.json());
};

export const useGetTableData = (
  listUrl: string,
  options: { limit: number; page: number }
) => {
  const [{ table }, tableDispatch] = useTableContext();

  React.useEffect(() => {
    tableDispatch(getTableDataAsync.request(undefined));
    getTableDataApi(listUrl, options)
      .then((data) => {
        tableDispatch(getTableDataAsync.success(data));
      })
      .catch((error) => {
        tableDispatch(getTableDataAsync.failure(error));
      });
  }, [options.limit, options.page]);

  return table;
};
