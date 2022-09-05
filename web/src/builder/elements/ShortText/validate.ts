import { FieldData } from '../../formData/formDataReducer';
import { ExactBuilderElement } from '../types';

export const validate = (
  element: ExactBuilderElement<'SHORT_TEXT'>,
  field: FieldData
) => {
  const validations = element.data.validations;
  if (validations.isRequired.value === true && !field.value) {
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
};
