import React from 'react';
import { Error } from '../../utils/types/Error';
import { Form } from '../forms/types';
import { UpdateFormBody } from './types';

const updateFormApi = (
  formId: string,
  updateFormBody: UpdateFormBody
): Promise<Form> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/${formId}/update`, {
    method: 'PATCH',
    body: JSON.stringify(updateFormBody),
  }).then((res) => {
    const data = res.json();
    if (res.status >= 400) throw data;
    return data;
  });
};

export const useUpdateForm = () => {
  const [state, setState] = React.useState<{
    data?: Form;
    isLoading: boolean;
    error?: any;
  }>({ isLoading: false });

  const updateForm = async (formId: string, updateFormBody: UpdateFormBody) => {
    setState({ isLoading: true });
    try {
      const data = await updateFormApi(formId, updateFormBody);
      setState({ isLoading: false, data });
    } catch (error) {
      setState({ isLoading: false, error });
      return error as { errors: Error[] };
    }
  };

  return [updateForm, state] as const;
};
