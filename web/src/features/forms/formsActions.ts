import { createAction } from '../../utils/createAction';
import { createAsyncAction } from '../../utils/createAsyncAction';
import { ValueOf } from '../../utils/types/ValueOf';
import { Form } from './types';

export const getFormsAsync = createAsyncAction('GET_FORMS')<
  undefined,
  Form[],
  any
>();

export const createForm = createAction(
  'CREATE_FORM',
  (action) => (form: Form) => action(form)
);

export const deleteForm = createAction(
  'DELETE_FORM',
  (action) => (formId: string) => action(formId)
);

export type FormsActions =
  | ReturnType<ValueOf<typeof getFormsAsync>>
  | ReturnType<typeof createForm>
  | ReturnType<typeof deleteForm>;
