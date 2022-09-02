import { Box, BoxProps } from '@chakra-ui/react';
import autoAnimate from '@formkit/auto-animate';
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ElementType } from '../../builder/builderReducer';
import { setDropId } from '../../dropId';

interface DroppableItemProps extends BoxProps {
  accept: ElementType | ElementType[];
  renderOnActive?: (isActive: boolean) => React.ReactNode;
}

export const DroppableItem: React.FC<DroppableItemProps> = ({
  accept,
  id,
  children,
  backgroundColor,
  renderOnActive = () => <Box w='full' h={5} />,
  ...props
}) => {
  const parent = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, { duration: 100, easing: 'linear' });
  }, [parent]);

  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    accept,
    drop: (_, monitor) => {
      const isOver = monitor.isOver({ shallow: true });
      if (isOver) {
        setDropId(id!);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      item: monitor.getItem() as {
        parentId: string;
        type: string;
        id: number;
        index: number;
      },
    }),
  }));

  return (
    <Box
      ref={drop(parent) as any}
      display='flex'
      flexDir='column'
      gap={2}
      backgroundColor={backgroundColor}
      {...props}
    >
      {children}
      {renderOnActive(item?.parentId !== id && isOver && canDrop)}
    </Box>
  );
};
