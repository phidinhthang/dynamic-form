import { Box } from '@chakra-ui/react';
import { useBuilderPageContext } from '../../BuilderPageContext';
import { BuilderElement } from '../../builderReducer';
import { DroppableItem } from '../../layout/mainPanel/DroppableItem';
import { SortableItem } from '../../layout/mainPanel/SortableItem';

interface EditBoxProps extends React.PropsWithChildren {
  element: BuilderElement;
  index: number;
}

export const EditBox: React.FC<EditBoxProps> = ({
  index,
  element,
  children,
}) => {
  const [, builderPageDispatch] = useBuilderPageContext();

  return (
    <SortableItem
      accept={['EDIT_BOX', 'SHORT_TEXT']}
      id={element.id}
      parentId={element.parentId}
      type='EDIT_BOX'
      index={index}
      key={element.id}
    >
      <DroppableItem
        my={1}
        accept={['SHORT_TEXT']}
        id={element.id}
        renderOnActive={(isActive) =>
          isActive ? (
            <Box
              w='full'
              h={10}
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
    </SortableItem>
  );
};
