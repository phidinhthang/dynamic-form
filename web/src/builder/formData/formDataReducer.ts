import { BuilderCtx } from '../builderReducer';
import { FormDataActions } from './formDataActions';
import mixin from 'mixin-deep';

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
  isTouched: boolean;
}

export type FieldData = BaseFieldData & ShortTextFieldData;

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
      if (element.type === 'SHORT_TEXT') {
        if (element.data.validations.isRequired.value === true && !value) {
          state.data[elementId].errors.isRequired = true;
        } else {
          state.data[elementId].errors.isRequired = false;
        }
        if (
          typeof element.data.validations.minLength.value === 'number' &&
          value.length < element.data.validations.minLength.value
        ) {
          state.data[elementId].errors.minLength = true;
        } else {
          state.data[elementId].errors.minLength = false;
        }
        if (
          typeof element.data.validations.maxLength.value === 'number' &&
          value.length > element.data.validations.maxLength.value
        ) {
          state.data[elementId].errors.maxLength = true;
        } else {
          state.data[elementId].errors.maxLength = false;
        }
      }
      break;
    }
    case 'SET_TOUCHED': {
      state.data[action.payload].isTouched = true;
      break;
    }
    case 'SUBMIT_FORM': {
      break;
    }
  }
};
