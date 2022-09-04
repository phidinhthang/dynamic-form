import {
  AddIcon,
  ChevronDownIcon,
  SearchIcon,
  ViewIcon,
  DragHandleIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TableColumn } from '../../features/forms/types';
import { SortableItem } from '../layout/mainPanel/SortableItem';
import {
  closeColumnsPopover,
  openColumnsPopover,
  reorderColumn,
} from './tableActions';
import { useTableContext } from './TableContext';
import { useShowOrHideColumn } from './useShowOrHideColumn';

interface ColumnsPopoverProps {
  formId: string;
  columns: TableColumn[];
}

export const ColumnsPopover: React.FC<ColumnsPopoverProps> = ({
  columns,
  formId,
}) => {
  const [{ isColumnsPopoverOpen }, tableDispatch] = useTableContext();
  const closePopover = () => tableDispatch(closeColumnsPopover());
  const openPopover = () => tableDispatch(openColumnsPopover());
  const onReorderColumn = (fromIndex: number, toIndex: number) =>
    tableDispatch(reorderColumn(fromIndex, toIndex));
  const [showOrHideColumn, { isLoading }] = useShowOrHideColumn(formId);

  return (
    <Popover
      isOpen={isColumnsPopoverOpen}
      onClose={closePopover}
      placement='bottom-end'
    >
      <PopoverTrigger>
        <Button
          rightIcon={<ChevronDownIcon />}
          leftIcon={<ViewIcon />}
          onClick={openPopover}
          mr={2}
        >
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent w={400}>
        <PopoverArrow />
        <PopoverHeader fontWeight='semibold'>Show/hide columns</PopoverHeader>
        <PopoverBody px={0}>
          <InputGroup mb={2}>
            <InputLeftElement children={<SearchIcon />} />
            <Input
              variant='unstyled'
              _focus={{ outline: 'none' }}
              height={10}
              fontSize='sm'
              placeholder='Search in columns...'
            />
          </InputGroup>
          <Divider />
          <DndProvider backend={HTML5Backend}>
            <Box
              py={2}
              px={3}
              display='flex'
              flexDir='column'
              gap={1}
              maxH={40}
              overflowY='auto'
            >
              {columns.map((column, index) => (
                <PopoverItem
                  column={column}
                  key={column.id}
                  onColumnVisibilityCheckboxChecked={() => {
                    const isHidden = !column.isHidden;
                    showOrHideColumn({ columnId: column.id, isHidden });
                  }}
                  index={index}
                  isColumnVisibilityChangeLoading={isLoading}
                  onReorderColumn={onReorderColumn}
                />
              ))}
            </Box>
          </DndProvider>
        </PopoverBody>
        <PopoverFooter>
          <Button variant='link' leftIcon={<AddIcon />}>
            Add new column
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

interface PopoverItemProps {
  column: TableColumn;
  onColumnVisibilityCheckboxChecked: () => void;
  onReorderColumn: (fromIndex: number, toIndex: number) => void;
  isColumnVisibilityChangeLoading: boolean;
  index: number;
}

export const PopoverItem: React.FC<PopoverItemProps> = ({
  column,
  isColumnVisibilityChangeLoading,
  onColumnVisibilityCheckboxChecked,
  onReorderColumn,
  index,
}) => {
  return (
    <SortableItem
      accept={'POPOVER_ITEM' as any}
      type={'POPOVER_ITEM' as any}
      id={column.id}
      index={index}
      parentId='POPOVER'
      onReorder={onReorderColumn}
    >
      <Box display='flex' justifyContent='space-between' py={1.5}>
        <Box display='flex' gap={2} alignItems='center'>
          <DragHandleIcon w={5} h={5} color='gray.500' cursor='grab' />
          <Checkbox
            size='lg'
            colorScheme='green'
            isChecked={!column.isHidden}
            checked={!column.isHidden}
            disabled={isColumnVisibilityChangeLoading}
            onChange={onColumnVisibilityCheckboxChecked}
          />
          <Text fontWeight='medium'>
            {column.label}
            <Text
              as='span'
              fontWeight='normal'
              fontSize='sm'
              color='gray.400'
              ml={2}
            >
              ({column.key})
            </Text>
          </Text>
        </Box>
        <Box></Box>
      </Box>
    </SortableItem>
  );
};
