import { Box } from '@chakra-ui/react';
import { BuilderElement, ExactBuilderElement } from '../types';
import { DroppableItem } from '../../layout/mainPanel/DroppableItem';
import { SortableItem } from '../../layout/mainPanel/SortableItem';

interface EditRowProps extends React.PropsWithChildren {
  element: ExactBuilderElement<'ROW'>;
  index: number;
}

export const EditRow: React.FC<EditRowProps> = ({
  element,
  index,
  children,
}) => {
  return (
    <DroppableItem
      my={1}
      px={2}
      accept={['SHORT_TEXT', 'NUMBER', 'SINGLE_CHOICE']}
      id={element.id}
      renderOnActive={(isActive) => (
        <Box
          w='full'
          h={10}
          display='flex'
          alignItems='center'
          justifyContent='center'
          border='1px dashed'
          borderColor={'gray.500'}
        >
          {isActive && 'Drop here!'}
        </Box>
      )}
    >
      <Box display='flex' mx={-2} gap={2} flexDir='row'>
        {children}
      </Box>
    </DroppableItem>
  );
};
