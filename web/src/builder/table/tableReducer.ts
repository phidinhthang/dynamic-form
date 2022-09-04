import { TableColumn } from '../../features/forms/types';
import { remove } from '../../utils/remove';
import { TableActions } from './tableActions';

export interface TableCtx {
  columns: TableColumn[];
  isAddColumnModalOpen: boolean;
  isAddColumnModalMountted: boolean;
  isColumnsPopoverOpen: boolean;
}

export const initialValues: TableCtx = {
  columns: [],
  isAddColumnModalMountted: false,
  isAddColumnModalOpen: false,
  isColumnsPopoverOpen: false,
};

export const tableReducer = (state: TableCtx, action: TableActions) => {
  switch (action.type) {
    case 'ADD_COLUMN_REQUEST': {
      console.log('add ', action);
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
    case 'OPEN_ADD_COLUMN_MODAL': {
      console.log('it open ');
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

    default: {
      throw Error(`Action ${action} is not handled.`);
    }
  }
};
