import { createAction } from '../../utils/createAction';

export const openModal = createAction(
  'OPEN_MODAL',
  (action) => () => action(undefined)
);
export const closeModal = createAction(
  'CLOSE_MODAL',
  (action) => () => action(undefined)
);
export const unmountModal = createAction(
  'UNMOUNT_MODAL',
  (action) => () => action(undefined)
);

export type CreateFormActions =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof unmountModal>;
