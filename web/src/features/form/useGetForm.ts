import React from 'react';
import { Form } from '../forms/types';
import { useFormContext } from './FormContext';

const getFormApi = (formId: string): Promise<Form> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`).then((res) =>
    res.json()
  );

export const useGetForm = (
  formId: string,
  { refetch = false }: { refetch: boolean }
) => {
  const [state, dispatch] = useFormContext();

  React.useEffect(() => {
    if (refetch) {
      dispatch({ type: 'GET_FORM_REQUEST', payload: undefined });
      getFormApi(formId)
        .then((form) => dispatch({ type: 'GET_FORM_SUCCESS', payload: form }))
        .then((error) =>
          dispatch({ type: 'GET_FORM_FAILURE', payload: error })
        );
    }
  }, [refetch]);

  return state;
};
