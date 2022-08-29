import { createAction } from '../utils/createAction';

export const openSidebar = createAction('OPEN_SIDEBAR', (action) => action);
export const closeSidebar = createAction('CLOSE_SIDEBAR', (action) => action);
export const openInspector = createAction('OPEN_INSPECTOR', (action) => action);
export const closeInspector = createAction(
  'CLOSE_INSPECTOR',
  (action) => action
);
export const setSelectedElementId = createAction(
  'SET_SELECTED_ELEMENT_ID',
  (action) => (elementId: string) => action(elementId)
);
export const clearSelectedElementId = createAction(
  'CLEAR_SELECTED_ELEMENT_ID',
  (action) => action
);
export const formPreviewMode = createAction(
  'FORM_PREVIEW_MODE',
  (action) => action
);
export const formEditMode = createAction('FORM_EDIT_MODE', (action) => action);

export type BuilderPageActions =
  | ReturnType<typeof openSidebar>
  | ReturnType<typeof closeSidebar>
  | ReturnType<typeof openInspector>
  | ReturnType<typeof closeInspector>
  | ReturnType<typeof setSelectedElementId>
  | ReturnType<typeof clearSelectedElementId>
  | ReturnType<typeof formPreviewMode>
  | ReturnType<typeof formEditMode>;
