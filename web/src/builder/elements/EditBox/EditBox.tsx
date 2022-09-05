import { Box } from '@chakra-ui/react';
import { ExactBuilderElement } from '../types';

interface EditBoxProps extends React.PropsWithChildren {
  element: ExactBuilderElement<'EDIT_BOX'>;
}

export const EditBox: React.FC<EditBoxProps> = ({ element, children }) => {
  return (
    <Box my={1} px={2}>
      {children}
      <Box w='full' h={10} bg='gray.200'></Box>
    </Box>
  );
};
