import { createAction } from '../../utils/createAction';

export const openModal = createAction(
  'OPEN_MODAL',
  (action) =>
    ({
      deleteFormId,
      deleteFormLabel,
    }: {
      deleteFormId: string;
      deleteFormLabel?: string;
    }) =>
      action({ deleteFormId, deleteFormLabel })
);

export const closeModal = createAction(
  'CLOSE_MODAL',
  (action) => () => action(undefined)
);

export type DeleteFormActions =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>;
