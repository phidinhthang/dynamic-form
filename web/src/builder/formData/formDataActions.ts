import { createAction } from '../../utils/createAction';
import { DeepPartial } from '../../utils/types/DeepPartial';
import { Primitive } from '../../utils/types/Primitive';
import { FieldData, FormDataCtx } from './formDataReducer';

export const changeData = createAction(
  'CHANGE_DATA',
  (action) => (elementId: string, data: DeepPartial<FieldData>) =>
    action({ elementId, data })
);

export const changeValue = createAction(
  'CHANGE_VALUE',
  (action) => (elementId: string, value: Primitive) =>
    action({ elementId, value })
);

export const setTouched = createAction(
  'SET_TOUCHED',
  (action) => (elementId: string) => action(elementId)
);

export const validateFields = createAction(
  'VALIDATE_FIELDS',
  (action) => () => action(undefined)
);

export const setSingleChoiceCheckedOptionId = createAction(
  'SET_SINGLE_CHOICE_CHECKED_OPTION_ID',
  (action) => (elementId: string, optionId: string) =>
    action({ optionId, elementId })
);

export type FormDataActions =
  | ReturnType<typeof changeData>
  | ReturnType<typeof changeValue>
  | ReturnType<typeof validateFields>
  | ReturnType<typeof setTouched>
  | ReturnType<typeof setSingleChoiceCheckedOptionId>;
