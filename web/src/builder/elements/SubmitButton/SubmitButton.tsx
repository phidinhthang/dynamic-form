import { Box, Button } from '@chakra-ui/react';
import { useFormDataContext } from '../../formData/FormDataContext';

export const SubmitButton = () => {
  const [, formDataDispatch] = useFormDataContext();

  return (
    <Box
      px={2}
      py={2}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Button type='submit' size='lg' px={8}>
        Submit
      </Button>
    </Box>
  );
};
