import { BuilderPageActions } from './builderPageActions';

export interface BuilderPageCtx {
  inEditMode: boolean;
  isSidebarOpen: boolean;
  inspectedElementId?: string;
  selectedElementId?: string;
}

export const initialValues: BuilderPageCtx = {
  inEditMode: true,
  inspectedElementId: undefined,
  isSidebarOpen: false,
  selectedElementId: undefined,
};

export const builderPageReducer = (
  state: BuilderPageCtx,
  action: BuilderPageActions
) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      state.isSidebarOpen = true;
      state.inspectedElementId = undefined;
      break;
    }
    case 'CLOSE_SIDEBAR': {
      state.isSidebarOpen = false;
      break;
    }
    case 'SET_INSPECT_ELEMENT_ID': {
      state.inspectedElementId = action.payload;
      state.isSidebarOpen = false;
      break;
    }
    case 'CLEAR_INSPECT_ELEMENT_ID': {
      state.inspectedElementId = undefined;
      break;
    }
    case 'SET_SELECTED_ELEMENT_ID': {
      state.selectedElementId = action.payload;
      break;
    }
    case 'CLEAR_SELECTED_ELEMENT_ID': {
      state.selectedElementId = undefined;
      break;
    }
    case 'FORM_PREVIEW_MODE': {
      state.inEditMode = false;
      break;
    }
    case 'FORM_EDIT_MODE': {
      state.inEditMode = true;
      break;
    }
    case 'TOGGLE_FORM_PREVIEW_MODE': {
      state.inEditMode = !state.inEditMode;
      break;
    }
    default: {
      break;
    }
  }
};
