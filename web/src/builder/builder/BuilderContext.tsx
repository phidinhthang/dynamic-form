import React, { useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { BuilderActions } from './builderActions';
import { builderReducer } from './builderReducer';
import { BuilderCtx } from '../elements/types';

export const [Provider, useBuilderContext] = createContext<
  [BuilderCtx, React.Dispatch<BuilderActions>]
>([
  {
    layout: [],
    elements: {},
  },
  () => {},
]);

interface BuilderProviderProps extends React.PropsWithChildren {
  initialValues?: BuilderCtx;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({
  children,
  initialValues = { elements: {}, layout: [] },
}) => {
  const [state, dispatch] = useReducer(builderReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
