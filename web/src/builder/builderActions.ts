import { createAction } from '../utils/createAction';
import {
  BuilderElement,
  ElementType,
  ExactBuilderElement,
} from './builderReducer';

export const reorderElement = createAction(
  'REORDER_ELEMENT',
  (action) =>
    (payload: { parentId: string; hoverIndex: number; dragIndex: number }) =>
      action(payload)
);

export const moveElement = createAction(
  'MOVE_ELEMENT',
  (action) =>
    (from: { parentId: string; id: string }, to: { parentId: string }) =>
      action({ from, to })
);

export const addElement = createAction(
  'ADD_ELEMENT',
  (action) => (parentId: string, type: ElementType) =>
    action({ parentId, type })
);

export const changeElementData = <T extends ElementType>() =>
  createAction(
    'CHANGE_ELEMENT_DATA',
    (action) =>
      (params: { id: string; data: Partial<ExactBuilderElement<T>['data']> }) =>
        action(params)
  );

export const deleteElement = createAction(
  'DELETE_ELEMENT',
  (action) => (elementId: string) => action(elementId)
);

export type BuilderActions =
  | ReturnType<typeof reorderElement>
  | ReturnType<typeof moveElement>
  | ReturnType<typeof addElement>
  | ReturnType<ReturnType<typeof changeElementData>>
  | ReturnType<typeof deleteElement>;
