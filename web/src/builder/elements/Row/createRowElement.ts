import { nanoid } from 'nanoid';
import { ExactBuilderElement } from '../types';
import { RowElement } from './interface';

export const createRowElement = ({
  parentId,
}: {
  parentId: string;
}): ExactBuilderElement<'ROW'> => {
  return {
    id: nanoid(),
    parentId,
    type: 'ROW',
    buildErrors: [],
    children: [],
    data: {},
    isTouched: false,
  };
};
