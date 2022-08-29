import { BuilderPageActions } from './builderPageActions';

export interface BuilderPageCtx {
  inEditMode: boolean;
  isSidebarOpen: boolean;
  isInspectorOpen: boolean;
  selectedElementId?: string;
}

export const initialValues: BuilderPageCtx = {
  inEditMode: true,
  isInspectorOpen: false,
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
      state.isInspectorOpen = false;
      break;
    }
    case 'CLOSE_SIDEBAR': {
      state.isSidebarOpen = false;
      break;
    }
    case 'OPEN_INSPECTOR': {
      state.isInspectorOpen = true;
      state.isSidebarOpen = false;
      break;
    }
    case 'CLOSE_INSPECTOR': {
      state.isInspectorOpen = false;
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
  }
};
