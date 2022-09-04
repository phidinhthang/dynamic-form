import { TableColumn } from '../../features/forms/types';
import { createAction } from '../../utils/createAction';
import { createAsyncAction } from '../../utils/createAsyncAction';
import { ValueOf } from '../../utils/types/ValueOf';

export interface ShowOrHideColumnPayload {
  columnId: string;
  isHidden: boolean;
}

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

export const showColumn = createAction(
  'SHOW_COLUMN',
  (action) => (columnId: string) => action({ columnId })
);

export const hideColumn = createAction(
  'HIDE_COLUMN',
  (action) => (columnId: string) => action({ columnId })
);

export const reorderColumn = createAction(
  'REORDER_COLUMN',
  (action) => (fromIndex: number, toIndex: number) =>
    action({ fromIndex, toIndex })
);

export type TableActions =
  | ReturnType<ValueOf<typeof addColumnAsync>>
  | ReturnType<typeof openAddColumnModal>
  | ReturnType<typeof closeAddColumnModal>
  | ReturnType<typeof unmountAddColumnModal>
  | ReturnType<typeof openColumnsPopover>
  | ReturnType<typeof closeColumnsPopover>
  | ReturnType<typeof showColumn>
  | ReturnType<typeof hideColumn>
  | ReturnType<typeof reorderColumn>;
