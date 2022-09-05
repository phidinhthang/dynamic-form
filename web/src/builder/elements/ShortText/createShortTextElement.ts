import { nanoid } from 'nanoid';
import { ExactBuilderElement } from '../types';

export const createShortTextElement = ({
  parentId,
}: {
  parentId: string;
}): ExactBuilderElement<'SHORT_TEXT'> => {
  return {
    id: nanoid(),
    parentId,
    type: 'SHORT_TEXT',
    children: [],
    buildErrors: [
      {
        errorKey: 'emptyKey',
        message: 'Element key is required.',
      },
    ],
    isTouched: false,
    data: {
      label: 'Type a label',
      subLabel: '',
      placeholder: '',
      key: '',
      defaultValue: '',
      validations: {
        isRequired: { value: false, errorMessage: '' },
        minLength: { errorMessage: '' },
        maxLength: { errorMessage: '' },
      },
    },
  };
};
