import { Box } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useDrag } from 'react-dnd';
import { useBuilderContext } from '../../BuilderContext';
import { ElementType } from '../../builderReducer';
import { clearDropId, getDropId } from '../../dropId';

interface SidebarItemProps extends React.PropsWithChildren {
  elementType: ElementType;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  elementType,
  children,
}) => {
  // const { setData } = useBuilderContext();
  const [, dispatch] = useBuilderContext();
  const [{ opacity }, drag] = useDrag(() => ({
    type: elementType,
    item: {
      type: elementType,
      parentId: 'sidebar',
      index: undefined,
      id: undefined,
    },
    end: (item, monitor) => {
      const dropId = getDropId();
      console.log('parent id ', dropId);
      if (!monitor.didDrop()) {
        return;
      }
      if (dropId) {
        const parentId = dropId;
        dispatch({
          type: 'ADD_ELEMENT',
          payload: { type: item.type, parentId },
        });
      }
      clearDropId();
      //  setData((data) => [...data, { id: nanoid(), name: type }]);
    },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.4 : 1,
      };
    },
  }));

  return (
    <Box
      py={2}
      px={4}
      border='1px dashed'
      borderColor='blue.500'
      opacity={opacity}
      ref={drag}
    >
      {children}
    </Box>
  );
};
