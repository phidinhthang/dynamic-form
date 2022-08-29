import { Form } from './types';
import { FormsActions } from './formsActions';

export interface FormsCtx {
  data: Form[];
  isLoading: boolean;
  error: any;
}

export const initialValues: FormsCtx = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const formsReducer = (
  state: FormsCtx = initialValues,
  action: FormsActions
) => {
  switch (action.type) {
    case 'GET_FORMS_REQUEST': {
      state.isLoading = true;
      break;
    }
    case 'GET_FORMS_SUCCESS': {
      state.data = action.payload;
      state.isLoading = false;
      break;
    }
    case 'GET_FORMS_FAILURE': {
      state.error = action.payload;
      state.isLoading = false;
      break;
    }
    case 'CREATE_FORM': {
      state.data.push(action.payload);
      break;
    }
    case 'DELETE_FORM': {
      state.data.splice(
        state.data.findIndex((form) => form.id === action.payload),
        1
      );
      break;
    }
  }
};
