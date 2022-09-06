import { nanoid } from 'nanoid';
import { ExactBuilderElement } from '../types';

export const createSingleChoiceElement = ({
  parentId,
}: {
  parentId: string;
}): ExactBuilderElement<'SINGLE_CHOICE'> => {
  return {
    id: nanoid(),
    parentId,
    type: 'SINGLE_CHOICE',
    children: [],
    buildErrors: [
      { errorKey: 'emptyKey', message: 'Element key is required.' },
    ],
    isTouched: false,
    data: {
      label: 'Type a label',
      key: '',
      options: [
        { id: nanoid(), label: 'Type option 1' },
        { id: nanoid(), label: 'Type option 2' },
        { id: nanoid(), label: 'Type option 3' },
        { id: nanoid(), label: 'Type option 4' },
      ],
      validations: {
        isRequired: {
          value: false,
          errorMessage: '',
        },
      },
    },
  };
};
