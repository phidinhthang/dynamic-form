import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { FormsActions } from './formsActions';
import { formsReducer, FormsCtx, initialValues } from './formsReducer';

const [Provider, useFormsContext] = createContext<
  [FormsCtx, React.Dispatch<FormsActions>]
>([initialValues, () => {}]);

interface FormsProviderProps extends React.PropsWithChildren {}

const FormsProvider: React.FC<FormsProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(formsReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { useFormsContext, FormsProvider };
