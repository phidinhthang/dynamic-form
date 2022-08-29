import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { CreateFormActions } from './createFormActions';
import {
  createFormReducer,
  CreateFormCtx,
  initialValues,
} from './createFormReducer';

const [Provider, useCreateFormsContext] = createContext<
  [CreateFormCtx, React.Dispatch<CreateFormActions>]
>([initialValues, () => {}]);

interface CreateFormProviderProps extends React.PropsWithChildren {}

const CreateFormProvider: React.FC<CreateFormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(createFormReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { useCreateFormsContext, CreateFormProvider };
