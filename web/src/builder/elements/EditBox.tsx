import { Box } from '@chakra-ui/react';
import { useBuilderPageContext } from '../builderPage/BuilderPageContext';
import { BuilderElement } from '../builder/builderReducer';
import { DroppableItem } from '../layout/mainPanel/DroppableItem';
import { SortableItem } from '../layout/mainPanel/SortableItem';

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
      accept={['EDIT_BOX', 'SHORT_TEXT', 'SUBMIT_BUTTON']}
      id={element.id}
      parentId={element.parentId}
      type='EDIT_BOX'
      index={index}
      key={element.id}
    >
      <DroppableItem
        my={1}
        px={2}
        accept={['SHORT_TEXT']}
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
    </SortableItem>
  );
};
