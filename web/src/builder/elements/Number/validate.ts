import { ExactFieldData } from '../../formData/formDataReducer';
import { ExactBuilderElement } from '../types';

export const validate = (
  element: ExactBuilderElement<'NUMBER'>,
  field: ExactFieldData<'NUMBER'>
) => {
  const validations = element.data.validations;
  if (
    validations.isRequired.value === true &&
    typeof field.value !== 'number'
  ) {
    field.errors.isRequired = true;
  } else {
    field.errors.isRequired = false;
  }

  if (
    typeof validations.min.value === 'number' &&
    (typeof field.value !== 'number' || field.value < validations.min.value)
  ) {
    field.errors.min = true;
  } else {
    field.errors.min = false;
  }

  if (
    typeof validations.max.value === 'number' &&
    (typeof field.value !== 'number' || field.value > validations.max.value)
  ) {
    field.errors.max = true;
  } else {
    field.errors.max = false;
  }
};
