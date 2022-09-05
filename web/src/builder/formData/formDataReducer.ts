import { BuilderCtx } from '../builder/builderReducer';
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
  key: string;
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
    case 'VALIDATE_FIELDS': {
      Object.values(state.elements).forEach((element) => {
        const data = state.data;
        const field = data[element.id];
        field.isTouched = true;
        if (element.type === 'SHORT_TEXT') {
          const validations = element.data.validations;
          if (validations.isRequired.value && !field.value) {
            field.errors.isRequired = true;
          } else {
            field.errors.isRequired = false;
          }
          if (
            typeof validations.minLength.value === 'number' &&
            (!field.value || field.value.length < validations.minLength.value)
          ) {
            field.errors.minLength = true;
          } else {
            field.errors.minLength = false;
          }
          if (
            typeof validations.maxLength.value === 'number' &&
            (!field.value || field.value.length > validations.maxLength.value)
          ) {
            field.errors.maxLength = true;
          } else {
            field.errors.maxLength = false;
          }
        }
      });
      break;
    }
  }
};
