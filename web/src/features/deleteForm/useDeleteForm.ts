import React from 'react';
import { useFormsContext } from '../forms/FormsContext';
import { Form } from '../forms/types';

export const deleteFormApi = (formId: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/form/${formId}/delete`, {
    method: 'DELETE',
  }).then((res) => {
    const data = res.json();
    if (res.status >= 400) throw data;
    return data;
  });

export const useDeleteForm = () => {
  const [state, setState] = React.useState<{
    data?: Form;
    isLoading: boolean;
    error?: any;
  }>({ isLoading: false });

  const [, formsDispatch] = useFormsContext();

  const deleteForm = async (formId: string) => {
    setState({ isLoading: true });

    try {
      const data = await deleteFormApi(formId);
      formsDispatch({ type: 'DELETE_FORM', payload: formId });
      setState({ isLoading: false, data });
      return data;
    } catch (error) {
      setState({ isLoading: false, error });
      return error as { errors: Error[] };
    }
  };

  return [deleteForm, state] as const;
};
