import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  textarea?: boolean;
  isRequired?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  isRequired,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = Textarea as any;
  }
  const [field, { error, touched }] = useField(props);
  return (
    <FormControl isInvalid={!!error && touched} isRequired={isRequired}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea id={field.name} {...field} {...props} />
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
