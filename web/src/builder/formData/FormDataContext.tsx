import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { BuilderCtx } from '../builder/builderReducer';
import { FormDataActions } from './formDataActions';
import { FormDataCtx, formDataReducer } from './formDataReducer';

export const [Provider, useFormDataContext] = createContext<
  [FormDataCtx, React.Dispatch<FormDataActions>]
>([{ layout: [], elements: {}, data: {} }, () => {}]);

interface FormDataProviderProps extends React.PropsWithChildren {
  value: BuilderCtx;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({
  value,
  children,
}) => {
  const data = React.useMemo(() => {
    const data: FormDataCtx['data'] = {};
    Object.values(value.elements).forEach((element) => {
      data[element.id] = {
        errors: { isRequired: false, maxLength: false, minLength: false },
        isTouched: false,
        key: (element.data as any)?.key,
        value: (element.data as any)?.defaultValue,
      };
    });
    return data;
  }, [value]);

  const [state, dispatch] = useImmerReducer(formDataReducer, {
    ...value,
    data,
  });

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
