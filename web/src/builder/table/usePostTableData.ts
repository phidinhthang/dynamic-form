import React from 'react';
import { Primitive } from '../../utils/types/Primitive';
import { addNewRow } from './tableActions';
import { useTableContext } from './TableContext';
import { TableRow } from './types';

const postTableDataApi = (postUrl: string, body: TableRow): Promise<TableRow> =>
  fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => {
    const data = res.json();
    if (res.status >= 400) {
      throw data;
    }
    return data;
  });

export const usePostTableData = (postUrl: string) => {
  const [, tableDispatch] = useTableContext();
  const [isLoading, setLoading] = React.useState(false);

  const postTableData = (body: TableRow) => {
    setLoading(true);
    return postTableDataApi(postUrl, body)
      .then((row) => tableDispatch(addNewRow(row)))
      .finally(() => setLoading(false));
  };

  return [postTableData, { isLoading }] as const;
};
