import { CreateFormActions } from './createFormActions';

export interface CreateFormCtx {
  isModalOpen: boolean;
  isModalMountted: boolean;
}

export const initialValues: CreateFormCtx = {
  isModalOpen: false,
  isModalMountted: false,
};

export const createFormReducer = (
  state: CreateFormCtx,
  action: CreateFormActions
) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      state.isModalOpen = true;
      state.isModalMountted = true;
      break;
    }
    case 'CLOSE_MODAL': {
      state.isModalOpen = false;
      break;
    }
    case 'UNMOUNT_MODAL': {
      state.isModalMountted = false;
      break;
    }
  }
};
