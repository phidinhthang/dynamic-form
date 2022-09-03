import React from 'react';
import { Form, TableColumn } from '../../features/forms/types';
import { useTableContext } from './TableContext';
import { addColumnAsync } from './tableActions';

const addColumnApi = async (
  formId: string,
  body: TableColumn
): Promise<Form> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/${formId}/add-column`, {
    method: 'PUT',
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const useAddColumn = (formId: string) => {
  const [, tableDispatch] = useTableContext();
  const [isLoading, setLoading] = React.useState(false);

  const addColumn = React.useCallback(
    (payload: TableColumn) => {
      tableDispatch(addColumnAsync.request(payload));
      setLoading(true);
      return addColumnApi(formId, payload)
        .then((data) => {
          setLoading(false);
          tableDispatch(addColumnAsync.success(undefined));
        })
        .catch((err) => {
          setLoading(false);
          tableDispatch(addColumnAsync.failure(payload));
        });
    },
    [formId]
  );

  return [addColumn, { isLoading }] as const;
};
