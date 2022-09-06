import { ExactFieldData } from '../../formData/formDataReducer';
import { ExactBuilderElement } from '../types';

export const validate = (
  element: ExactBuilderElement<'SINGLE_CHOICE'>,
  field: ExactFieldData<'SINGLE_CHOICE'>
) => {
  const validations = element.data.validations;
  if (validations.isRequired.value === true && !field.value) {
    field.errors.isRequired = true;
  } else {
    field.errors.isRequired = false;
  }
};
