import { TableColumn } from '../../features/forms/types';
import { createAction } from '../../utils/createAction';
import { createAsyncAction } from '../../utils/createAsyncAction';
import { ValueOf } from '../../utils/types/ValueOf';

export const addColumnAsync = createAsyncAction('ADD_COLUMN')<
  TableColumn,
  any,
  TableColumn
>();

export const openAddColumnModal = createAction(
  'OPEN_ADD_COLUMN_MODAL',
  (action) => () => action(undefined)
);
export const closeAddColumnModal = createAction(
  'CLOSE_ADD_COLUMN_MODAL',
  (action) => () => action(undefined)
);
export const unmountAddColumnModal = createAction(
  'UNMOUNT_ADD_COLUMN_MODAL',
  (action) => () => action(undefined)
);

export const openColumnsPopover = createAction(
  'OPEN_COLUMNS_POPOVER',
  (action) => () => action(undefined)
);
export const closeColumnsPopover = createAction(
  'CLOSE_COLUMNS_POPOVER',
  (action) => () => action(undefined)
);

export type TableActions =
  | ReturnType<ValueOf<typeof addColumnAsync>>
  | ReturnType<typeof openAddColumnModal>
  | ReturnType<typeof closeAddColumnModal>
  | ReturnType<typeof unmountAddColumnModal>
  | ReturnType<typeof openColumnsPopover>
  | ReturnType<typeof closeColumnsPopover>;
