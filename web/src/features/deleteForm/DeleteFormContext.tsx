import { useImmerReducer } from 'use-immer';
import { createContext } from '../../utils/createContext';
import { DeleteFormActions } from './deleteFormActions';
import {
  deleteFormReducer,
  DeleteFormCtx,
  initialValues,
} from './deleteFormReducer';

const [Provider, useDeleteFormContext] = createContext<
  [DeleteFormCtx, React.Dispatch<DeleteFormActions>]
>([initialValues, () => {}]);

interface DeleteFormProviderProps extends React.PropsWithChildren {}

const DeleteFormProvider: React.FC<DeleteFormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(deleteFormReducer, initialValues);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { useDeleteFormContext, DeleteFormProvider };
