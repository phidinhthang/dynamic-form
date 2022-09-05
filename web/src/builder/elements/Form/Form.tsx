import produce from 'immer';
import { flushSync } from 'react-dom';
import { useFormContext } from '../../../features/form/FormContext';
import { useNextState } from '../../../shared-hooks/useNextState';
import { validateFields } from '../../formData/formDataActions';
import { useFormDataContext } from '../../formData/FormDataContext';
import { formDataReducer } from '../../formData/formDataReducer';
import { TableRow } from '../../table/types';
import { hasInvalidField } from '../../utils/hasInvalidField';

interface FormProps extends React.PropsWithChildren {
  onSubmit?: (row: TableRow) => void;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const [{ data, elements, layout }, formDataDispatch] = useFormDataContext();
  const [{ data: form }] = useFormContext();

  const hasError = hasInvalidField(data);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (hasError) {
          return;
        }

        formDataDispatch(validateFields());
        const { data: nextData } = produce(
          { data, elements, layout },
          (draft) => {
            formDataReducer(draft, validateFields());
          }
        );

        const hasNextError = hasInvalidField(nextData);

        if (hasNextError) {
          return;
        }

        const row = Object.values(data)
          .filter((field) => !!field.key)
          .reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
          }, {} as TableRow);

        onSubmit?.(row);
      }}
      autoComplete='off'
    >
      {children}
    </form>
  );
};
