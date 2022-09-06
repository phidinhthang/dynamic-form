import { Box } from '@chakra-ui/react';
import { BuilderElement, ExactBuilderElement } from '../types';
import { DroppableItem } from '../../layout/mainPanel/DroppableItem';
import { SortableItem } from '../../layout/mainPanel/SortableItem';

interface EditEditBoxProps extends React.PropsWithChildren {
  element: ExactBuilderElement<'EDIT_BOX'>;
  index: number;
}

export const EditEditBox: React.FC<EditEditBoxProps> = ({
  element,
  index,
  children,
}) => {
  return (
    <DroppableItem
      my={1}
      px={2}
      accept={['SHORT_TEXT', 'NUMBER']}
      id={element.id}
      renderOnActive={(isActive) =>
        isActive ? (
          <Box
            w='full'
            h={10}
            border='1px dashed'
            display='flex'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            Drop here!
          </Box>
        ) : (
          <Box w='full' h={10} bg='gray.200'></Box>
        )
      }
    >
      {children}
    </DroppableItem>
  );
};
