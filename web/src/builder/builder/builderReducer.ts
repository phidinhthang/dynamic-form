import { BuilderActions } from './builderActions';
import { applyPatches, enablePatches, Patch, produce } from 'immer';
import mixin from 'mixin-deep';
import { wrapArr } from '../../utils/wrapArr';
import { group } from '../../utils/group';
import { pushOne } from '../../utils/pushOne';
import { fork } from '../../utils/fork';
import { remove } from '../../utils/remove';
import { createShortTextElement } from '../elements/ShortText/createShortTextElement';
import { createEditBoxElement } from '../elements/EditBox/createEditBoxElement';
import { createSubmitButtonElement } from '../elements/SubmitButton/createSubmitButtonElement';
import {
  FieldElementType,
  ElementType,
  BuilderCtx,
  BuilderElement,
  FieldElement,
} from '../elements/types';

enablePatches();

export const allFieldElementTypes: FieldElementType[] = ['SHORT_TEXT'];

export const allBuilderElementTypes: ElementType[] = [
  'EDIT_BOX',
  'SHORT_TEXT',
  'SUBMIT_BUTTON',
];

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
          let element: BuilderElement;
          if (type === 'SHORT_TEXT') {
            element = createShortTextElement({ parentId });
          } else if (type === 'EDIT_BOX') {
            element = createEditBoxElement({ parentId });
          } else {
            element = createSubmitButtonElement({ parentId });
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
          mixin(
            draftState.elements[action.payload.id].data,
            action.payload.data
          );
          break;
        }

        case 'CHANGE_ELEMENT_KEY': {
          const elements: Record<string, FieldElement> =
            draftState.elements as any;
          const element: FieldElement = elements[
            action.payload.elementId
          ] as any;
          element.data.key = action.payload.key;
          if (allFieldElementTypes.includes(element.type as any)) {
            if (action.payload.key === '') {
              pushOne(
                element.buildErrors,
                { errorKey: 'emptyKey' },
                {
                  errorKey: 'emptyKey',
                  message: 'Element key is required.',
                }
              );
            } else {
              wrapArr(element.buildErrors).remove(
                (e) => e.errorKey === 'emptyKey'
              );
            }
          }

          const [duplicatedKeysGroup, uniqueKeysGroup] = fork(
            Object.values(
              group(
                Object.values(elements)
                  .filter((e) => allFieldElementTypes.includes(element.type))
                  .filter((e) => e.data.key !== ''),
                (ele) => ele.data.key
              )
            ),
            (groupedByKey) => groupedByKey.length > 1
          );
          duplicatedKeysGroup.forEach((groupedByKey) => {
            groupedByKey.forEach((ele) => {
              pushOne(
                ele.buildErrors,
                { errorKey: 'duplicateKey' },
                {
                  errorKey: 'duplicateKey',
                  message: `Field key "${ele.data.key}" is duplicated with other field.`,
                }
              );
            });
          });
          uniqueKeysGroup.forEach((groupedByKey) => {
            groupedByKey.forEach((ele) => {
              remove(
                ele.buildErrors,
                (item) => item.errorKey === 'duplicateKey'
              );
            });
          });
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

        case 'SET_ELEMENT_TOUCHED': {
          const element = draftState.elements[action.payload.elementId];
          if (element) {
            element.isTouched = true;
          }
          break;
        }

        case 'SET_ALL_ELEMENT_TOUCHED': {
          Object.values(draftState.elements).forEach((element) => {
            element.isTouched = true;
          });
          break;
        }

        case 'UNDO_CHANGES': {
          const undo = timeline[currentVersion]?.undo;
          if (!undo) return;
          currentVersion--;
          applyPatches(state, undo);
          break;
        }

        case 'REDO_CHANGES': {
          currentVersion++;
          const redo = timeline[currentVersion]?.redo;

          if (!redo) {
            currentVersion--;
            break;
          }
          applyPatches(state, redo);
          break;
        }

        default: {
          throw new Error(`Action ${action} is not handled.`);
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
