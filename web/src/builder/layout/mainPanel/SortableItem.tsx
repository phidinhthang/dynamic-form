import { Box } from '@chakra-ui/react';
import { Identifier, XYCoord } from 'dnd-core';
import React from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { useBuilderContext } from '../../builder/BuilderContext';
import { ElementType } from '../../elements/types';
import { clearDropId, getDropId } from '../../dropId';

interface SortableItemProps {
  index: number;
  id: string;
  parentId: string;
  type: ElementType;
  accept: ElementType | ElementType[];
  children?: React.ReactNode;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  parentId: string;
  id: string;
  type: ElementType;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  accept,
  id,
  index,
  type,
  children,
  parentId,
  onReorder,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, dispatch] = useBuilderContext();
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept,
    collect: (monitor) => {
      return { handlerId: monitor.getHandlerId() };
    },
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex && item.parentId === parentId) return;
      if (typeof dragIndex === 'undefined' || item.parentId !== parentId) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset() as XYCoord;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (typeof onReorder !== 'undefined') {
        onReorder(dragIndex, hoverIndex);
      } else {
        dispatch({
          type: 'REORDER_ELEMENT',
          payload: { parentId, dragIndex, hoverIndex },
        });
      }

      // @move card
      item.index = hoverIndex;
      item.parentId = parentId;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => {
      return { id, index, type, parentId };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropId = getDropId();
      if (!monitor.didDrop()) {
        return;
      }
      const dropResult = monitor.getDropResult() as { id: string };

      if (dropResult.id === parentId) {
        return;
      }

      // move item from item.parentId, item.id to dropResult.id
      if (typeof onReorder === 'undefined') {
        if (dropId)
          dispatch({
            type: 'MOVE_ELEMENT',
            payload: {
              from: { parentId, id: item.id },
              to: { parentId: dropId },
            },
          });
      }
      clearDropId();
    },
  });

  const opacity = isDragging ? 0.3 : 1;

  drag(drop(ref));

  return (
    <Box ref={ref} opacity={opacity} data-handler-id={handlerId}>
      {children}
    </Box>
  );
};
