import { nanoid } from 'nanoid';
import { BuilderActions } from './builderActions';

export interface BaseBuilderElement {
  id: string;
  children: string[];
  parentId: string;
}

export interface ShortTextElement {
  type: 'SHORT_TEXT';
  data: {
    label: string;
    subLabel: string;
  };
}

export interface EditBoxElement {
  type: 'EDIT_BOX';
  data: {};
}

export type BuilderElement = BaseBuilderElement &
  (ShortTextElement | EditBoxElement);

export type ElementType = BuilderElement['type'];

export type ExactBuilderElement<T extends ElementType> = BaseBuilderElement &
  {
    SHORT_TEXT: ShortTextElement;
    EDIT_BOX: EditBoxElement;
  }[T];

export interface BuilderCtx {
  layout: string[];
  elements: Record<
    string,
    BuilderElement & (ShortTextElement | EditBoxElement)
  >;
}

export const initialValues: BuilderCtx = {
  elements: {},
  layout: [],
};

export const builderReducer = (state: BuilderCtx, action: BuilderActions) => {
  switch (action.type) {
    case 'REORDER_ELEMENT': {
      const { dragIndex, hoverIndex, parentId } = action.payload;
      if (parentId === 'root') {
        const dragItem = state.layout.splice(dragIndex, 1)[0];
        state.layout.splice(hoverIndex, 0, dragItem);
      } else {
        const parent = state.elements[parentId];
        if (parent.children) {
          const dragItem = parent.children.splice(dragIndex, 1)[0];
          parent.children.splice(hoverIndex, 0, dragItem);
        }
      }
      break;
    }
    case 'MOVE_ELEMENT': {
      const { from, to } = action.payload;
      const sourceParent =
        from.parentId === 'root'
          ? state.layout
          : state.elements[from.parentId].children;
      const destinationParent =
        to.parentId === 'root'
          ? state.layout
          : state.elements[to.parentId].children;
      const dropId = sourceParent?.splice(
        sourceParent.findIndex((id) => id === from.id),
        1
      )?.[0];
      if (dropId) {
        destinationParent?.push(dropId);
        state.elements[from.id].parentId = to.parentId;
      }
      break;
    }
    case 'ADD_ELEMENT': {
      const { parentId, type } = action.payload;
      // @ts-ignore
      const element: BuilderElement = {
        id: nanoid(),
        parentId,
        type,
        children: [],
      };
      if (element.type === 'SHORT_TEXT') {
        element['data'] = { label: '', subLabel: '' };
      } else if (element.type === 'EDIT_BOX') {
        element['data'] = {};
      }
      state.elements[element.id] = element;
      if (parentId === 'root') {
        state.layout.push(element.id);
      } else {
        state.elements[parentId].children?.push(element.id);
      }
      break;
    }

    case 'CHANGE_ELEMENT_DATA': {
      // @
      Object.assign(
        state.elements[action.payload.id].data,
        action.payload.data
      );
      break;
    }

    case 'DELETE_ELEMENT': {
      const parentId = state.elements[action.payload].parentId;
      if (parentId === 'root') {
        state.layout.splice(
          state.layout.findIndex((id) => id === action.payload),
          1
        );
      } else {
        state.elements[parentId].children.splice(
          state.elements[parentId].children.findIndex(
            (id) => id === action.payload
          ),
          1
        );
      }
      delete state.elements[action.payload];
      break;
    }
  }
};
