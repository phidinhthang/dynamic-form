import { createAction } from '../../utils/createAction';
import { DeepPartial } from '../../utils/types/DeepPartial';
import { FieldData, FormDataCtx } from './formDataReducer';

export const changeData = createAction(
  'CHANGE_DATA',
  (action) => (elementId: string, data: DeepPartial<FieldData>) =>
    action({ elementId, data })
);

export const changeValue = createAction(
  'CHANGE_VALUE',
  (action) => (elementId: string, value: string) => action({ elementId, value })
);

export const setTouched = createAction(
  'SET_TOUCHED',
  (action) => (elementId: string) => action(elementId)
);

export const submitForm = createAction('SUBMIT_FORM', (action) => action);

export type FormDataActions =
  | ReturnType<typeof changeData>
  | ReturnType<typeof changeValue>
  | ReturnType<typeof submitForm>
  | ReturnType<typeof setTouched>;
