import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../utils/createContext';
import { BuilderPageActions } from './builderPageActions';
import {
  BuilderPageCtx,
  builderPageReducer,
  initialValues,
} from './builderPageReducer';

export const [Provider, useBuilderPageContext] = createContext<
  [BuilderPageCtx, React.Dispatch<BuilderPageActions>]
>([initialValues, () => {}]);

interface BuilderPageProviderProps extends React.PropsWithChildren {}

export const BuilderPageProvider: React.FC<BuilderPageProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(builderPageReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
