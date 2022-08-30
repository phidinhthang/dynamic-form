import React, { useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../utils/createContext';
import { BuilderActions } from './builderActions';
import { BuilderCtx, builderReducer, initialValues } from './builderReducer';

export const [Provider, useBuilderContext] = createContext<
  [BuilderCtx, React.Dispatch<BuilderActions>]
>([
  {
    layout: [],
    elements: {},
  },
  () => {},
]);

interface BuilderProviderProps extends React.PropsWithChildren {}
export const BuilderProvider: React.FC<BuilderProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(builderReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
