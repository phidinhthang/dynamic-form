import { createAsyncAction } from '../../utils/createAsyncAction';
import { ValueOf } from '../../utils/types/ValueOf';
import { Form } from '../forms/types';

export const getFormAsync = createAsyncAction('GET_FORM')<
  undefined,
  Form,
  any
>();

export type FormActions = ReturnType<ValueOf<typeof getFormAsync>>;
