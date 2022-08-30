import { submitForm } from '../../../formData/formDataActions';
import { useFormDataContext } from '../../../formData/FormDataContext';

interface FormProps extends React.PropsWithChildren {}

export const Form: React.FC<FormProps> = ({ children }) => {
  const [{ data }, formDataDispatch] = useFormDataContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('state ', data);
      }}
      autoComplete='off'
    >
      {children}
    </form>
  );
};
