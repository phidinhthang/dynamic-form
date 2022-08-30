import { Button } from '@chakra-ui/react';
import { useFormDataContext } from '../../../formData/FormDataContext';

export const SubmitButton = () => {
  const [, formDataDispatch] = useFormDataContext();

  return <Button type='submit'>Submit</Button>;
};
