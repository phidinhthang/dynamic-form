import React from 'react';
import { TableData } from './types';

const getTableDataApi = (listUrl: string): Promise<TableData> => {
  return fetch(listUrl).then((res) => res.json());
};

export const useGetTableData = (listUrl: string) => {
  const [state, setState] = React.useState<{
    isLoading: boolean;
    data?: TableData;
    error?: any;
  }>({
    isLoading: false,
  });

  React.useEffect(() => {
    setState({ isLoading: true });
    getTableDataApi(listUrl)
      .then((data) => setState({ isLoading: false, data, error: undefined }))
      .catch((error) => setState({ isLoading: false, data: undefined, error }));
  }, []);

  return state;
};
