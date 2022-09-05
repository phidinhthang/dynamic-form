import { FieldData } from '../formData/formDataReducer';

export const hasInvalidField = (fields: Record<string, FieldData>) => {
  const hasError =
    Object.values(fields).findIndex((field) => {
      return Object.values(field.errors).findIndex((isError) => isError) !== -1;
    }) !== -1;

  return hasError;
};
