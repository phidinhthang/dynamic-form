import React from 'react';
import { Form } from './types';
import { useFormsContext } from './FormsContext';

const getFormsApi = (): Promise<Form[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/list`).then((res) =>
    res.json()
  );

export const useGetForms = ({ refetch = false }: { refetch: boolean }) => {
  const [state, dispatch] = useFormsContext();

  React.useEffect(() => {
    if (refetch) {
      dispatch({ type: 'GET_FORMS_REQUEST', payload: undefined });
      getFormsApi()
        .then((forms) =>
          dispatch({ type: 'GET_FORMS_SUCCESS', payload: forms })
        )
        .then((error) =>
          dispatch({ type: 'GET_FORMS_FAILURE', payload: error })
        );
    }
  }, [refetch]);

  return state;
};
