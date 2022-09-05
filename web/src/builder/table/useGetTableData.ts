import React from 'react';
import { getTableDataAsync } from './tableActions';
import { useTableContext } from './TableContext';
import { TableData } from './types';

const getTableDataApi = (listUrl: string): Promise<TableData> => {
  return fetch(listUrl).then((res) => res.json());
};

export const useGetTableData = (listUrl: string) => {
  const [{ table }, tableDispatch] = useTableContext();

  React.useEffect(() => {
    tableDispatch(getTableDataAsync.request(undefined));
    getTableDataApi(listUrl)
      .then((data) => {
        tableDispatch(getTableDataAsync.success(data));
      })
      .catch((error) => {
        tableDispatch(getTableDataAsync.failure(error));
      });
  }, []);

  return table;
};
