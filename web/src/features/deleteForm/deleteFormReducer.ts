import { DeleteFormActions } from './deleteFormActions';

export interface DeleteFormCtx {
  deleteFormId?: string;
  deleteFormLabel?: string;
}

export const initialValues = {};

export const deleteFormReducer = (
  state: DeleteFormCtx,
  action: DeleteFormActions
) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      state.deleteFormId = action.payload.deleteFormId;
      state.deleteFormLabel = action.payload.deleteFormLabel;
      break;
    }
    case 'CLOSE_MODAL': {
      state.deleteFormId = undefined;
      state.deleteFormLabel = undefined;
      break;
    }
  }
};
