import { nanoid } from 'nanoid';
import { ExactBuilderElement } from '../types';

export const createNumberElement = ({
  parentId,
}: {
  parentId: string;
}): ExactBuilderElement<'NUMBER'> => {
  return {
    id: nanoid(),
    parentId,
    type: 'NUMBER',
    children: [],
    buildErrors: [
      { errorKey: 'emptyKey', message: 'Element key is required.' },
    ],
    isTouched: false,
    data: {
      label: 'Number',
      subLabel: '',
      placeholder: 'ex: 23',
      key: '',
      validations: {
        isRequired: { value: false, errorMessage: '' },
        max: { errorMessage: '' },
        min: { errorMessage: '' },
      },
    },
  };
};
