import React from 'react';
import { INTERPOLATION_REGEXP } from '../../utils/constants';
import { deleteRow } from './tableActions';
import { useTableContext } from './TableContext';

const deleteTableDataApi = async (
  rawDeleteUrl: string,
  rowId: string
): Promise<boolean> => {
  const provider = {
    id: rowId,
  };
  const deleteUrl = rawDeleteUrl.replace(
    INTERPOLATION_REGEXP,
    function (m, m1) {
      return (provider as any)[m1] || m;
    }
  );

  return fetch(deleteUrl, {
    method: 'DELETE',
  }).then((res) => {
    const data = res.json();
    if (res.status >= 400) {
      throw data;
    }

    return data;
  });
};

export const useDeleteTableData = (deleteUrl: string) => {
  const [, tableDispatch] = useTableContext();
  const [isLoading, setLoading] = React.useState(false);

  const deleteTableData = async (rowId: string) => {
    setLoading(true);
    return deleteTableDataApi(deleteUrl, rowId)
      .then(() => {
        tableDispatch(deleteRow(rowId));
      })
      .finally(() => setLoading(false));
  };

  return [deleteTableData, { isLoading }] as const;
};
