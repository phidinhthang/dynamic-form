import { BuilderActions } from './builderActions';
import { applyPatches, enablePatches, Patch, produce } from 'immer';
import mixin from 'mixin-deep';
import { wrapArr } from '../../utils/wrapArr';
import { group } from '../../utils/group';
import { pushOne } from '../../utils/pushOne';
import { fork } from '../../utils/fork';
import { remove } from '../../utils/remove';
import { createShortTextElement } from '../elements/ShortText/createShortTextElement';
import { createRowElement } from '../elements/Row/createRowElement';
import { createSubmitButtonElement } from '../elements/SubmitButton/createSubmitButtonElement';
import { BuilderCtx, BuilderElement, FieldElement } from '../elements/types';
import { allFieldElementTypes } from '../elements/constants';
import { createNumberElement } from '../elements/Number/createNumberElement';
import { createSingleChoiceElement } from '../elements/SingleChoice/createSingleChoiceElement';
import { SingleChoiceOptionElement } from '../elements/SingleChoice/interface';
import { nanoid } from 'nanoid';

enablePatches();

export const initialValues: BuilderCtx = {
  elements: {},
  layout: [],
};

const notAllowedActions: BuilderActions['type'][] = [
  'UNDO_CHANGES',
  'REDO_CHANGES',
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
          } else if (type === 'SUBMIT_BUTTON') {
            element = createSubmitButtonElement({ parentId });
          } else if (type === 'NUMBER') {
            element = createNumberElement({ parentId });
          } else if (type === 'SINGLE_CHOICE') {
            element = createSingleChoiceElement({ parentId });
          } else if (type === 'ROW') {
            element = createRowElement({ parentId });
          } else {
            throw new Error('Element type not found.');
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

        case 'DELETE_SINGLE_CHOICE_OPTION': {
          const singleChoiceElement =
            draftState.elements[action.payload.elementId];

          if (
            singleChoiceElement &&
            singleChoiceElement.type === 'SINGLE_CHOICE'
          ) {
            remove(
              singleChoiceElement.data.options,
              (option) => option.id === action.payload.optionId
            );
          }

          break;
        }

        case 'ADD_SINGLE_CHOICE_OPTION': {
          const singleChoiceOption: SingleChoiceOptionElement = {
            id: nanoid(),
            label: '',
          };
          const element = draftState.elements[action.payload.elementId];

          if (element?.type === 'SINGLE_CHOICE') {
            element.data.options.push(singleChoiceOption);
          }

          break;
        }

        case 'CHANGE_SINGLE_CHOICE_OPTION_LABEL': {
          const element = draftState.elements[action.payload.elementId];
          if (element?.type === 'SINGLE_CHOICE') {
            const option = element.data.options.find(
              (option) => option.id === action.payload.optionId
            );
            if (option) {
              option.label = action.payload.label;
            }
          }

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
