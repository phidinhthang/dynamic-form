import { createAsyncAction } from '../../utils/createAsyncAction';
import { ValueOf } from '../../utils/types/ValueOf';
import { Form, TableColumn } from '../forms/types';

export const getFormAsync = createAsyncAction('GET_FORM')<
  undefined,
  Form,
  any
>();

export const addFormColumnAsync = createAsyncAction('ADD_FORM_COLUMN')<
  TableColumn,
  any,
  TableColumn
>();

export type FormActions =
  | ReturnType<ValueOf<typeof getFormAsync>>
  | ReturnType<ValueOf<typeof addFormColumnAsync>>;
