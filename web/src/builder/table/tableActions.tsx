import { TableColumn } from '../../features/forms/types';
import { createAction } from '../../utils/createAction';
import { createAsyncAction } from '../../utils/createAsyncAction';
import { ValueOf } from '../../utils/types/ValueOf';
import { PaginationResponse, TableData, TableRow } from './types';

export interface ShowOrHideColumnPayload {
  columnId: string;
  isHidden: boolean;
}

export const getTableDataAsync = createAsyncAction('GET_TABLE_DATA')<
  undefined,
  PaginationResponse<TableRow>,
  any
>();

export const addNewRow = createAction(
  'ADD_NEW_ROW',
  (action) => (row: TableRow) => action(row)
);

export const deleteRow = createAction(
  'DELETE_ROW',
  (action) => (rowId: string) => action(rowId)
);

export const setRowSelectedIds = createAction(
  'SET_ROW_SELECTED_IDS',
  (action) => (rowSelectedIds: string[]) => action(rowSelectedIds)
);

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

export const openPostTableDataModal = createAction(
  'OPEN_POST_TABLE_DATA_MODAL',
  (action) => () => action(undefined)
);
export const closePostTableDataModal = createAction(
  'CLOSE_POST_TABLE_DATA_MODAL',
  (action) => () => action(undefined)
);
export const unmountPostTableDataModal = createAction(
  'UNMOUNT_POST_TABLE_DATA_MODAL',
  (action) => () => action(undefined)
);

export const openDeleteTableDataModal = createAction(
  'OPEN_DELETE_TABLE_DATA_MODAL',
  (action) => () => action(undefined)
);
export const closeDeleteTableDataModal = createAction(
  'CLOSE_DELETE_TABLE_DATA_MODAL',
  (action) => () => action(undefined)
);

export type TableActions =
  | ReturnType<ValueOf<typeof addColumnAsync>>
  | ReturnType<ValueOf<typeof getTableDataAsync>>
  | ReturnType<typeof setRowSelectedIds>
  | ReturnType<typeof addNewRow>
  | ReturnType<typeof deleteRow>
  | ReturnType<typeof openAddColumnModal>
  | ReturnType<typeof closeAddColumnModal>
  | ReturnType<typeof unmountAddColumnModal>
  | ReturnType<typeof openColumnsPopover>
  | ReturnType<typeof closeColumnsPopover>
  | ReturnType<typeof showColumn>
  | ReturnType<typeof hideColumn>
  | ReturnType<typeof reorderColumn>
  | ReturnType<typeof openPostTableDataModal>
  | ReturnType<typeof closePostTableDataModal>
  | ReturnType<typeof unmountPostTableDataModal>
  | ReturnType<typeof openDeleteTableDataModal>
  | ReturnType<typeof closeDeleteTableDataModal>;
