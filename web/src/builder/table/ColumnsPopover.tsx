import {
  AddIcon,
  ChevronDownIcon,
  SearchIcon,
  ViewIcon,
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
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { TableColumn } from '../../features/forms/types';
import { closeColumnsPopover, openColumnsPopover } from './tableActions';
import { useTableContext } from './TableContext';

interface ColumnsPopoverProps {
  columns: TableColumn[];
}

export const ColumnsPopover: React.FC<ColumnsPopoverProps> = ({ columns }) => {
  const [{ isColumnsPopoverOpen }, tableDispatch] = useTableContext();
  const closePopover = () => tableDispatch(closeColumnsPopover());
  const openPopover = () => tableDispatch(openColumnsPopover());

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
              <Box display='flex' justifyContent='space-between' py={1.5}>
                <Box display='flex' gap={2}>
                  <Checkbox size='lg' colorScheme='green' />
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
            ))}
          </Box>
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
