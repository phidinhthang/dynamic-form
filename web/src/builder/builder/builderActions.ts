import { DeepPartial } from '@chakra-ui/react';
import { createAction } from '../../utils/createAction';
import {
  BuilderElement,
  ElementType,
  ExactBuilderElement,
  FieldElementType,
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
      (params: {
        id: string;
        data: DeepPartial<ExactBuilderElement<T>['data']>;
      }) =>
        action(params)
  );

export const changeElementKey = createAction(
  'CHANGE_ELEMENT_KEY',
  (action) => (elementId: string, key: string) => action({ elementId, key })
);

export const setElementTouched = createAction(
  'SET_ELEMENT_TOUCHED',
  (action) =>
    (elementId: string, isTouched: boolean = true) =>
      action({ elementId, isTouched })
);

export const deleteElement = createAction(
  'DELETE_ELEMENT',
  (action) => (elementId: string) => action(elementId)
);

export const undoChanges = createAction('UNDO_CHANGES', (action) => action);
export const redoChanges = createAction('REDO_CHANGES', (action) => action);

export type BuilderActions =
  | ReturnType<typeof reorderElement>
  | ReturnType<typeof moveElement>
  | ReturnType<typeof addElement>
  | ReturnType<typeof deleteElement>
  | ReturnType<ReturnType<typeof changeElementData>>
  | ReturnType<typeof undoChanges>
  | ReturnType<typeof redoChanges>
  | ReturnType<typeof changeElementKey>
  | ReturnType<typeof setElementTouched>;
