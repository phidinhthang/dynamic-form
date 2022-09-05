import { TableColumn } from '../../features/forms/types';
import { remove } from '../../utils/remove';
import { TableActions } from './tableActions';
import { TableData } from './types';

export interface TableCtx {
  columns: TableColumn[];
  table: {
    data?: TableData;
    isLoading: boolean;
    error?: any;
  };
  selectedRowIds: string[];
  isAddColumnModalOpen: boolean;
  isAddColumnModalMountted: boolean;
  isColumnsPopoverOpen: boolean;
  isPostTableDataModalOpen: boolean;
  isPostTableDataModalMountted: boolean;
  isDeleteTableDataModalOpen: boolean;
}

export const initialValues: TableCtx = {
  columns: [],
  table: {
    isLoading: false,
  },
  selectedRowIds: [],
  isAddColumnModalMountted: false,
  isAddColumnModalOpen: false,
  isColumnsPopoverOpen: false,
  isPostTableDataModalMountted: false,
  isPostTableDataModalOpen: false,
  isDeleteTableDataModalOpen: false,
};

export const tableReducer = (state: TableCtx, action: TableActions) => {
  switch (action.type) {
    case 'GET_TABLE_DATA_REQUEST': {
      state.table.isLoading = true;
      break;
    }

    case 'GET_TABLE_DATA_SUCCESS': {
      state.table.isLoading = false;
      state.table.data = action.payload;
      break;
    }

    case 'GET_TABLE_DATA_FAILURE': {
      state.table.isLoading = false;
      state.table.error = action.payload;
      break;
    }

    case 'ADD_NEW_ROW': {
      state.table.data?.push(action.payload);
      break;
    }

    case 'DELETE_ROW': {
      remove(state.table.data || [], (row) => row.id === action.payload);
      remove(state.selectedRowIds, (rowId) => rowId === action.payload);
      break;
    }

    case 'ADD_COLUMN_REQUEST': {
      state.columns.push(action.payload);
      break;
    }
    case 'ADD_COLUMN_SUCCESS': {
      break;
    }
    case 'ADD_COLUMN_FAILURE': {
      remove(state.columns, (column) => column.id === action.payload.id);
      break;
    }

    case 'SET_ROW_SELECTED_IDS': {
      console.log('run here ?');
      console.log(action.payload);
      state.selectedRowIds = action.payload;
      break;
    }

    case 'OPEN_ADD_COLUMN_MODAL': {
      state.isAddColumnModalOpen = true;
      state.isAddColumnModalMountted = true;
      break;
    }
    case 'CLOSE_ADD_COLUMN_MODAL': {
      state.isAddColumnModalOpen = false;
      break;
    }
    case 'UNMOUNT_ADD_COLUMN_MODAL': {
      state.isAddColumnModalMountted = false;
      break;
    }
    case 'OPEN_COLUMNS_POPOVER': {
      state.isColumnsPopoverOpen = true;
      break;
    }
    case 'CLOSE_COLUMNS_POPOVER': {
      state.isColumnsPopoverOpen = false;
      break;
    }
    case 'SHOW_COLUMN': {
      const column = state.columns.find(
        (col) => col.id === action.payload.columnId
      );
      if (column) {
        column.isHidden = false;
      }
      break;
    }

    case 'HIDE_COLUMN': {
      const column = state.columns.find(
        (col) => col.id === action.payload.columnId
      );
      if (column) {
        column.isHidden = true;
      }
      break;
    }

    case 'REORDER_COLUMN': {
      const { fromIndex, toIndex } = action.payload;
      const reorderedColumn = state.columns.splice(fromIndex, 1)[0];
      state.columns.splice(toIndex, 0, reorderedColumn);
      break;
    }

    case 'OPEN_POST_TABLE_DATA_MODAL': {
      state.isPostTableDataModalOpen = true;
      state.isPostTableDataModalMountted = true;
      break;
    }

    case 'CLOSE_POST_TABLE_DATA_MODAL': {
      state.isPostTableDataModalOpen = false;
      break;
    }

    case 'UNMOUNT_POST_TABLE_DATA_MODAL': {
      state.isPostTableDataModalMountted = false;
      break;
    }

    case 'OPEN_DELETE_TABLE_DATA_MODAL': {
      state.isDeleteTableDataModalOpen = true;
      break;
    }

    case 'CLOSE_DELETE_TABLE_DATA_MODAL': {
      state.isDeleteTableDataModalOpen = false;
      break;
    }

    default: {
      throw Error(`Action ${action} is not handled.`);
    }
  }
};
