import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { FormActions } from './formActions';
import { formReducer, FormCtx, initialValues } from './formReducer';

const [Provider, useFormContext] = createContext<
  [FormCtx, React.Dispatch<FormActions>]
>([initialValues, () => {}]);

interface FormProviderProps extends React.PropsWithChildren {}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(formReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { useFormContext, FormProvider };
