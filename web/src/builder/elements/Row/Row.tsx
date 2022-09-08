import { Box } from '@chakra-ui/react';
import { ExactBuilderElement } from '../types';

interface RowProps extends React.PropsWithChildren {
  element: ExactBuilderElement<'ROW'>;
}

export const Row: React.FC<RowProps> = ({ element, children }) => {
  return (
    <Box my={1} px={2}>
      <Box display={'flex'} mx={-2} gap={2}>
        {children}
      </Box>
    </Box>
  );
};
