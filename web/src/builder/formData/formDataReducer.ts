import { BuilderCtx } from '../elements/types';
import { FormDataActions } from './formDataActions';
import mixin from 'mixin-deep';
import { validate as validateShortTextField } from '../elements/ShortText/validate';
import { validate as validateNumberField } from '../elements/Number/validate';

interface BaseFieldData {
  isTouched: boolean;
}

interface ShortTextFieldData {
  value?: string;
  errors: {
    isRequired: boolean;
    minLength: boolean;
    maxLength: boolean;
  };
  key: string;
}

interface NumberFieldData {
  value?: number;
  errors: {
    isRequired: boolean;
    min: boolean;
    max: boolean;
  };
  key: string;
}

interface AllFieldData {
  SHORT_TEXT: ShortTextFieldData;
  NUMBER: NumberFieldData;
}

type FieldDataType = keyof AllFieldData;

export type FieldData = AllFieldData[FieldDataType] & BaseFieldData;

export type ExactFieldData<T extends FieldDataType> = AllFieldData[T] &
  BaseFieldData;

export interface FormDataCtx extends BuilderCtx {
  data: Record<string, FieldData>;
}

export const formDataReducer = (
  state: FormDataCtx,
  action: FormDataActions
) => {
  switch (action.type) {
    case 'CHANGE_DATA': {
      mixin(state.data[action.payload.elementId], action.payload.data);
      break;
    }
    case 'CHANGE_VALUE': {
      const { elementId, value } = action.payload;
      mixin(state.data[elementId], { value });
      const element = state.elements[elementId];
      const field = state.data[element.id];
      if (element.type === 'SHORT_TEXT') {
        validateShortTextField(element, field as ExactFieldData<'SHORT_TEXT'>);
      } else if (element.type === 'NUMBER') {
        validateNumberField(element, field as ExactFieldData<'NUMBER'>);
      }
      break;
    }
    case 'SET_TOUCHED': {
      state.data[action.payload].isTouched = true;
      break;
    }
    case 'VALIDATE_FIELDS': {
      Object.values(state.elements).forEach((element) => {
        const field = state.data[element.id];
        field.isTouched = true;
        if (element.type === 'SHORT_TEXT') {
          validateShortTextField(
            element,
            field as ExactFieldData<'SHORT_TEXT'>
          );
        } else if (element.type === 'NUMBER') {
          validateNumberField(element, field as ExactFieldData<'NUMBER'>);
        }
      });
      break;
    }
  }
};
