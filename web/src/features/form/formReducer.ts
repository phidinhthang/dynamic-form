import { remove } from '../../utils/remove';
import { Form } from '../forms/types';
import { FormActions } from './formActions';

export interface FormCtx {
  data?: Form;
  isLoading: boolean;
  error: any;
}

export const initialValues: FormCtx = {
  isLoading: false,
  error: undefined,
};

export const formReducer = (
  state: FormCtx = initialValues,
  action: FormActions
) => {
  switch (action.type) {
    case 'GET_FORM_REQUEST': {
      state.isLoading = true;
      break;
    }
    case 'GET_FORM_SUCCESS': {
      state.data = action.payload;
      state.isLoading = false;
      break;
    }
    case 'GET_FORM_FAILURE': {
      state.error = action.payload;
      state.isLoading = false;
      break;
    }
  }
};
