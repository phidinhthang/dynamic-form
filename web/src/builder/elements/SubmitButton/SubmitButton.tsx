import { Box, Button } from '@chakra-ui/react';
import { useFormDataContext } from '../../formData/FormDataContext';

export const SubmitButton = () => {
  const [{ data }, formDataDispatch] = useFormDataContext();

  const hasError =
    Object.values(data).findIndex((element) => {
      return (
        Object.values(element.errors).findIndex((isError) => isError) !== -1
      );
    }) !== -1;

  return (
    <Box
      px={2}
      py={2}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Button type='submit' size='lg' px={8} disabled={hasError}>
        Submit
      </Button>
    </Box>
  );
};
