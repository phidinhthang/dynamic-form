import { nanoid } from 'nanoid';
import { ExactBuilderElement } from '../types';
import { EditBoxElement } from './interface';

export const createEditBoxElement = ({
  parentId,
}: {
  parentId: string;
}): ExactBuilderElement<'EDIT_BOX'> => {
  return {
    id: nanoid(),
    parentId,
    type: 'EDIT_BOX',
    buildErrors: [],
    children: [],
    data: {},
    isTouched: false,
  };
};
