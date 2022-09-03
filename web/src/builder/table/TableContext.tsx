import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { TableActions } from './tableActions';
import { tableReducer, TableCtx, initialValues } from './tableReducer';

const [Provider, useTableContext] = createContext<
  [TableCtx, React.Dispatch<TableActions>]
>([initialValues, () => {}]);

interface TableProviderProps extends React.PropsWithChildren {
  initialValues: TableCtx;
}

const TableProvider: React.FC<TableProviderProps> = ({
  children,
  initialValues = { columns: [] },
}) => {
  const [state, dispatch] = useImmerReducer(tableReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { TableProvider, useTableContext };
