import React from 'react';
import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { BuilderCtx } from '../elements/types';
import { FormDataActions } from './formDataActions';
import {
  ExactFieldData,
  FormDataCtx,
  formDataReducer,
} from './formDataReducer';

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
      if (element.type === 'SHORT_TEXT') {
        (data[element.id] as ExactFieldData<'SHORT_TEXT'>) = {
          errors: { isRequired: false, maxLength: false, minLength: false },
          isTouched: false,
          key: element.data.key,
          value: element.data.defaultValue,
        };
      } else if (element.type === 'NUMBER') {
        (data[element.id] as ExactFieldData<'NUMBER'>) = {
          errors: { isRequired: false, max: false, min: false },
          isTouched: false,
          key: element.data.key,
          value: element.data.defaultValue,
        };
      } else if (element.type === 'SINGLE_CHOICE') {
        (data[element.id] as ExactFieldData<'SINGLE_CHOICE'>) = {
          errors: { isRequired: false },
          isTouched: false,
          key: element.data.key,
          defaultCheckedId: element.data.defaultSelectedId,
          value: element.data.defaultSelectedId
            ? element.data.options?.find(
                (option) => element.data.defaultSelectedId === option.id
              )?.value ||
              element.data.options?.find(
                (option) => element.data.defaultSelectedId === option.id
              )?.label
            : undefined,
        };
      } else {
        // @ts-ignore
        data[element.id] = {
          // @ts-ignore
          errors: {},
          isTouched: false,
        };
      }
    });
    return data;
  }, [value]);

  const [state, dispatch] = useImmerReducer(formDataReducer, {
    ...value,
    data,
  });

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
