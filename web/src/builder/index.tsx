import { Box, Button } from '@chakra-ui/react';
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';
import { XYCoord, Identifier } from 'dnd-core';
import { nanoid } from 'nanoid';
import autoAnimate from '@formkit/auto-animate';
import { useBuilderContext } from './BuilderContext';
import React from 'react';
import produce from 'immer';
import { SidebarItem } from './layout/sidebar/SidebarItem';
import { DroppableItem } from './layout/mainPanel/DroppableItem';
import { SortableItem } from './layout/mainPanel/SortableItem';
import { ShortText } from './components/elements/ShortText';
import { EdittableWrapper } from './components/EditableWrapper';
import { GenForm } from './components/GenForm';
import { useBuilderPageContext } from './BuilderPageContext';

export const BuilderPage = () => {
  const [{ layout, elements }] = useBuilderContext();
  const [{ inEditMode }, builderPageDispatch] = useBuilderPageContext();
  return (
    <Box display='flex' gap={12}>
      <Box>
        <SidebarItem elementType='EDIT_BOX'>Box</SidebarItem>
        <SidebarItem elementType='SHORT_TEXT'>INPUT</SidebarItem>
      </Box>

      <Box flexGrow='1'>
        <Box display='flex' justifyContent='center' mb={5}>
          <Button
            onClick={() =>
              console.log("lay out '", layout, 'elements ', elements)
            }
          >
            ok{' '}
          </Button>
          <Button
            onClick={() =>
              builderPageDispatch({
                type: 'FORM_PREVIEW_MODE',
                payload: undefined,
              })
            }
          >
            preview mode
          </Button>
          <Button
            onClick={() =>
              builderPageDispatch({
                type: 'FORM_EDIT_MODE',
                payload: undefined,
              })
            }
          >
            edit mode
          </Button>
        </Box>
        <Box border='2px solid black' w='full' maxW={800} mx='auto'>
          <GenForm
            data={{ elements, layout }}
            mode={inEditMode ? 'edit' : 'preview'}
          />
        </Box>
      </Box>
    </Box>
  );

  // const { data } = useBuilderContext();
  // return (
  //   <Box display='flex' gap={12}>
  //     <Box>
  //       <SidebarItem name='menu' />
  //       <SidebarItem name='input' />
  //     </Box>
  //     <Box>
  //       <Button onClick={() => console.log(data)}>ok</Button>
  //     </Box>
  //     <Box display='flex' alignItems='center' justifyContent='center'>
  //       <MainPanel />
  //     </Box>
  //   </Box>
  // );
};

// const MainPanel = () => {
//   const { data, setData } = useBuilderContext();
//   const parent = React.useRef<HTMLDivElement>(null);

//   React.useEffect(() => {
//     parent.current &&
//       autoAnimate(parent.current, { duration: 100, easing: 'linear' });
//   }, [parent]);
//   const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
//     accept: 'BOX',
//     drop: () => ({
//       name: `main-panel`,
//     }),
//     collect: (monitor: DropTargetMonitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//       item: monitor.getItem() as { name: string },
//     }),
//   }));

//   const moveCard = React.useCallback(
//     (dragIndex: number, hoverIndex: number) => {
//       setData(
//         produce((data) => {
//           const dragItem = data.splice(dragIndex, 1)[0];
//           data.splice(hoverIndex, 0, dragItem);
//         })
//       );
//     },
//     []
//   );

//   return (
//     <Box
//       ref={drop(parent) as any}
//       w={480}
//       h={480}
//       display='flex'
//       flexDir='column'
//       gap={3}
//       borderWidth={2}
//       borderStyle='dashed'
//       borderColor={isOver ? (canDrop ? 'green.500' : 'red.500') : 'black'}
//     >
//       {data.map((item, index) => (
//         <Item
//           key={item.id}
//           id={item.id}
//           text={item.name}
//           moveCard={moveCard}
//           index={index}
//         />
//       ))}
//       {item?.name && isOver && canDrop && (
//         <Box
//           opacity={0.4}
//           px={2}
//           py={1}
//           border='1px dashed'
//           borderColor='black'
//         >
//           {item.name}
//         </Box>
//       )}
//     </Box>
//   );
// };

// const SidebarItem: React.FC<{ name: string }> = ({ name }) => {
//   const { setData } = useBuilderContext();
//   const [{ opacity }, drag] = useDrag(() => ({
//     type: 'BOX',
//     item: {
//       name,
//     },
//     end: ({ name }, monitor) => {
//       if (!monitor.didDrop()) {
//         return;
//       }
//       setData((data) => [...data, { id: nanoid(), name }]);
//     },
//     collect(monitor) {
//       return {
//         opacity: monitor.isDragging() ? 0.4 : 1,
//       };
//     },
//   }));

//   return (
//     <Box
//       py={2}
//       px={4}
//       border='1px dashed'
//       borderColor='blue.500'
//       opacity={opacity}
//       ref={drag}
//     >
//       {name}
//     </Box>
//   );
// };

// interface ItemProps {
//   index: number;
//   id: string;
//   text: string;
//   moveCard: (dragIndex: number, hoverIndex: number) => void;
// }

// interface DragItem {
//   index?: number;
//   type: string;
// }
// const Item: React.FC<ItemProps> = ({ id, index, moveCard, text }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [{ handlerId }, drop] = useDrop<
//     DragItem,
//     void,
//     { handlerId: Identifier | null }
//   >({
//     accept: 'BOX',
//     collect: (monitor) => {
//       return {
//         handlerId: monitor.getHandlerId(),
//       };
//     },
//     hover(item: DragItem, monitor) {
//       if (!ref.current) {
//         return;
//       }

//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) return;

//       const hoverBoundingRect = ref.current?.getBoundingClientRect();

//       const hoverMiddleY =
//         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

//       const clientOffset = monitor.getClientOffset() as XYCoord;

//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;

//       if (typeof dragIndex === 'undefined') {
//         return;
//       }

//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }

//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }

//       moveCard(dragIndex, hoverIndex);

//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: 'BOX',
//     item: () => {
//       return { id, index };
//     },
//     collect: (monitor: DragSourceMonitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const opacity = isDragging ? 0.3 : 1;

//   drag(drop(ref));

//   return (
//     <Box
//       ref={ref}
//       opacity={opacity}
//       data-handler-id={handlerId}
//       px={2}
//       py={1}
//       border='1px dashed'
//       borderColor='black'
//     >
//       {text}
//     </Box>
//   );
// };
