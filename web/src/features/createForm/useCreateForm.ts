import React from 'react';
import { Error } from '../../utils/types/Error';
import { useFormsContext } from '../forms/FormsContext';
import { Form } from '../forms/types';
import { CreateFormBody } from './types';

export const createFormApi = (createFormBody: CreateFormBody): Promise<Form> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/create`, {
    method: 'POST',
    body: JSON.stringify(createFormBody),
  }).then((res) => {
    const data = res.json();
    if (res.status >= 400) throw data;
    return data;
  });

export const useCreateForm = () => {
  const [state, setState] = React.useState<{
    data?: Form;
    isLoading: boolean;
    error?: any;
  }>({ isLoading: false });
  const [, formsDispatch] = useFormsContext();

  const createForm = async (createFormBody: CreateFormBody) => {
    setState({ isLoading: true });
    try {
      const data = await createFormApi(createFormBody);
      formsDispatch({ type: 'CREATE_FORM', payload: data });
      setState({ isLoading: false, data });
      return data;
    } catch (error) {
      setState({ isLoading: false, error });
      return error as { errors: Error[] };
    }
  };

  return [createForm, state] as const;
};
