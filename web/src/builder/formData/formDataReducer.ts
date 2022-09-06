import { BuilderCtx } from '../elements/types';
import { FormDataActions } from './formDataActions';
import mixin from 'mixin-deep';
import { validate as validateShortTextField } from '../elements/ShortText/validate';
import { validate as validateNumberField } from '../elements/Number/validate';
import { validate as validateSingleChoiceField } from '../elements/SingleChoice/validate';

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

interface SingleChoiceData {
  value?: string;
  key: string;
  defaultCheckedId?: string;
  checkedId?: string;
  errors: {
    isRequired: boolean;
  };
}

interface AllFieldData {
  SHORT_TEXT: ShortTextFieldData;
  NUMBER: NumberFieldData;
  SINGLE_CHOICE: SingleChoiceData;
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
      } else if (element.type === 'SINGLE_CHOICE') {
        validateSingleChoiceField(
          element,
          field as ExactFieldData<'SINGLE_CHOICE'>
        );
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
        } else if (element.type === 'SINGLE_CHOICE') {
          validateSingleChoiceField(
            element,
            field as ExactFieldData<'SINGLE_CHOICE'>
          );
        } else if (element.type === 'NUMBER') {
          validateNumberField(element, field as ExactFieldData<'NUMBER'>);
        }
      });
      break;
    }
    case 'SET_SINGLE_CHOICE_CHECKED_OPTION_ID': {
      const field = state.data[
        action.payload.elementId
      ] as ExactFieldData<'SINGLE_CHOICE'>;
      field.checkedId = action.payload.optionId;
      break;
    }
  }
};
