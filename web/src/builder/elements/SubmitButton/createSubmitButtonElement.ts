import { nanoid } from 'nanoid';
import { ExactBuilderElement } from '../types';

export const createSubmitButtonElement = ({
  parentId,
}: {
  parentId: string;
}): ExactBuilderElement<'SUBMIT_BUTTON'> => {
  return {
    id: nanoid(),
    parentId,
    type: 'SUBMIT_BUTTON',
    buildErrors: [],
    children: [],
    data: {},
    isTouched: false,
  };
};
