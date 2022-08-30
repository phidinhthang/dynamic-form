import { nanoid } from 'nanoid';
import { BuilderActions } from './builderActions';
import { applyPatches, enablePatches, Patch, produce } from 'immer';
import mixin from 'mixin-deep';

enablePatches();

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
    placeholder: string;
    key: string;
    defaultValue: string;
    validations: {
      isRequired: {
        value: boolean;
        errorMessage: string;
      };
      minLength: {
        value?: number;
        errorMessage: string;
      };
      maxLength: {
        value?: number;
        errorMessage: string;
      };
    };
  };
}

export interface EditBoxElement {
  type: 'EDIT_BOX';
  data: {};
}

export interface SubmitButtonElement {
  type: 'SUBMIT_BUTTON';
  data: {};
}

export type ElementType = BuilderElement['type'];

export type ExactBuilderElement<T extends ElementType> = BaseBuilderElement &
  {
    SHORT_TEXT: ShortTextElement;
    EDIT_BOX: EditBoxElement;
    SUBMIT_BUTTON: SubmitButtonElement;
  }[T];

export type BuilderElement = ExactBuilderElement<
  'SHORT_TEXT' | 'EDIT_BOX' | 'SUBMIT_BUTTON'
>;

export interface BuilderCtx {
  layout: string[];
  elements: Record<string, BuilderElement>;
}

export const initialValues: BuilderCtx = {
  elements: {},
  layout: [],
};

const notAllowedActions: BuilderActions['type'][] = [
  'UNDO_CHANGES',
  'REDO_CHANGES',
  'CHANGE_ELEMENT_DATA',
];
let currentVersion = -1;
const timeline: Record<string, { redo: Patch[]; undo: Patch[] }> = {};

export const builderReducer = (state: BuilderCtx, action: BuilderActions) => {
  const nextState = produce(
    state,
    (draftState) => {
      switch (action.type) {
        case 'REORDER_ELEMENT': {
          const { dragIndex, hoverIndex, parentId } = action.payload;
          if (parentId === 'root') {
            const dragItem = draftState.layout.splice(dragIndex, 1)[0];
            draftState.layout.splice(hoverIndex, 0, dragItem);
          } else {
            const parent = draftState.elements[parentId];
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
              ? draftState.layout
              : draftState.elements[from.parentId].children;
          const destinationParent =
            to.parentId === 'root'
              ? draftState.layout
              : draftState.elements[to.parentId].children;
          const dropId = sourceParent?.splice(
            sourceParent.findIndex((id) => id === from.id),
            1
          )?.[0];
          if (dropId) {
            destinationParent?.push(dropId);
            draftState.elements[from.id].parentId = to.parentId;
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
            element['data'] = {
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
            };
          } else if (element.type === 'EDIT_BOX') {
            element['data'] = {};
          } else if (element.type === 'SUBMIT_BUTTON') {
            element['data'] = {};
          }
          draftState.elements[element.id] = element;
          if (parentId === 'root') {
            draftState.layout.push(element.id);
          } else {
            draftState.elements[parentId].children?.push(element.id);
          }
          break;
        }

        case 'CHANGE_ELEMENT_DATA': {
          // @
          mixin(
            draftState.elements[action.payload.id].data,
            action.payload.data
          );
          break;
        }

        case 'DELETE_ELEMENT': {
          const element = draftState.elements[action.payload];
          // @delete all children before delete element itself
          element.children.forEach((childId) => {
            // @should delete recursively
            delete draftState.elements[childId];
          });
          const parentId = element.parentId;
          if (parentId === 'root') {
            draftState.layout.splice(
              draftState.layout.findIndex((id) => id === action.payload),
              1
            );
          } else {
            draftState.elements[parentId].children.splice(
              draftState.elements[parentId].children.findIndex(
                (id) => id === action.payload
              ),
              1
            );
          }
          delete draftState.elements[action.payload];
          break;
        }

        case 'UNDO_CHANGES': {
          const undo = timeline[currentVersion]?.undo;
          if (!undo) return;
          currentVersion--;
          return applyPatches(state, undo);
        }

        case 'REDO_CHANGES': {
          currentVersion++;
          const redo = timeline[currentVersion]?.redo;

          if (!redo) {
            currentVersion--;
            return;
          }

          return applyPatches(state, redo);
        }

        default: {
          break;
        }
      }
    },
    (patches, inversePatches) => {
      if (!notAllowedActions.includes(action.type)) {
        currentVersion++;

        timeline[currentVersion] = {
          redo: patches,
          undo: inversePatches,
        };
      }
    }
  );

  return nextState;
};
