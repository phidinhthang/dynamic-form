import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TableColumn } from '../../features/forms/types';
import { useFormDataContext } from '../formData/FormDataContext';
import { useGetTableData } from './useGetTableData';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { useTableContext } from './TableContext';
import {
  closeDeleteTableDataModal,
  openAddColumnModal,
  openDeleteTableDataModal,
  openPostTableDataModal,
  setRowSelectedIds,
} from './tableActions';
import { ColumnsPopover } from './ColumnsPopover';
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import { TableRow } from './types';
import { DOTS, usePagination } from '../../shared-hooks/usePagination';
import { DotsIcon } from '../../icons/DotsIcon';

interface DataTableProps {
  listUrl: string;
  formId: string;
}

export const DataTable: React.FC<DataTableProps> = ({ listUrl, formId }) => {
  const [currPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(2);
  const { data } = useGetTableData(listUrl, { limit, page: currPage });
  const [{ columns, selectedRowIds }, tableDispatch] = useTableContext();
  const [{ elements }, formDispatch] = useFormDataContext();

  const rowSelection = selectedRowIds.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const headers = React.useMemo<ColumnDef<TableColumn, any>[]>(() => {
    return columns
      .filter((column) => !column.isHidden)
      .map((col) => ({ accessorKey: col.key, header: col.label }));
  }, [columns]);

  const table = useReactTable<TableRow>({
    data: data?.data || [],
    columns: headers as any,
    state: { rowSelection },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (rowSelectionUpdater) => {
      const newRowSelection =
        typeof rowSelectionUpdater === 'function'
          ? rowSelectionUpdater?.(rowSelection)
          : rowSelectionUpdater;
      tableDispatch(setRowSelectedIds(Object.keys(newRowSelection)));
    },
    getRowId: (row) => row.id as string,
  });

  const {
    currentPage,
    range,
    firstPage,
    lastPage,
    nextPage,
    previousPage,
    setPage,
  } = usePagination({
    currentPage: currPage,
    total: data?.paging?.total,
    onPageChange: (page) => {
      setCurrentPage(page);
      tableDispatch(setRowSelectedIds([]));
    },
  });

  const onOpenAddColumnModal = () => tableDispatch(openAddColumnModal());

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' py={2}>
        <Box display='flex' gap={2}>
          <Select
            placeholder='Choose a field'
            size='md'
            variant='filled'
            bg='blue.50'
          >
            {columns.map((column) => (
              <option value={column.key} key={column.id}>
                {column.label}
              </option>
            ))}
          </Select>
          <Input />
        </Box>
        <Box display='flex' alignItems='center' gap={4}>
          {!!selectedRowIds.length && (
            <Button
              colorScheme='linkedin'
              onClick={() => tableDispatch(setRowSelectedIds([]))}
            >
              Deselect
            </Button>
          )}
          <Button onClick={() => tableDispatch(openPostTableDataModal())}>
            Add new row
          </Button>
        </Box>
        <Box display='flex' alignItems='center' gap={4}>
          {selectedRowIds.length === 1 && (
            <Button
              variant='outline'
              colorScheme='red'
              leftIcon={<DeleteIcon />}
              onClick={() => tableDispatch(openDeleteTableDataModal())}
            >
              Delete
            </Button>
          )}
          <ColumnsPopover columns={columns} formId={formId} />
        </Box>
      </Box>
      <Box bg='#F3F3FE' borderY='1px solid #c3cad8' h='calc(100vh - 100px)'>
        <TableContainer
          w='fit-content'
          h='full'
          maxH='calc(100vh - 100px)'
          overflowY='auto'
          css={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '24px',
            },
          }}
        >
          <Table size='sm'>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  <Th
                    borderBottom='1px'
                    borderLeft='1px solid'
                    borderLeftColor='#c3cad8'
                    borderBottomColor='#c3cad8'
                    bg='#F2F3FB'
                    position='sticky'
                    top={0}
                    boxShadow='inset 0 1px 0 #c3cad8, inset 0 -1px 0 #c3cad8'
                    h={10}
                  >
                    <Checkbox
                      isIndeterminate={table.getIsSomeRowsSelected()}
                      isChecked={table.getIsAllRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                  </Th>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <Th
                        key={header.id}
                        w={200}
                        h={10}
                        colSpan={header.colSpan}
                        borderBottom='1px'
                        borderLeft='1px solid'
                        borderLeftColor='#c3cad8'
                        borderBottomColor='#c3cad8'
                        bg='#F2F3FB'
                        position='sticky'
                        top={0}
                        boxShadow='inset 0 1px 0 #c3cad8, inset 0 -1px 0 #c3cad8'
                      >
                        {header.isPlaceholder ? null : (
                          <Text>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                        )}
                      </Th>
                    );
                  })}
                  <Th
                    w={86}
                    bg='#D3D6EC'
                    borderBottom='1px'
                    borderBottomColor='#c3cad8'
                    borderLeft='1px solid #D3D6EC'
                    borderRight='1px solid #D3D6EC'
                    cursor='pointer'
                    position='sticky'
                    top={0}
                    boxShadow='inset 0 1px 0 #c3cad8, inset 0 -1px 0 #c3cad8'
                    onClick={onOpenAddColumnModal}
                  >
                    <Box display='inline-flex' gap={2} alignItems='center'>
                      <AddIcon />
                      <Text>Add</Text>
                    </Box>
                  </Th>
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Tr key={row.id}>
                    <Td
                      borderLeft='1px solid'
                      borderLeftColor='#c3cad8'
                      borderBottom='1px'
                      borderBottomColor='#c3cad8'
                      bg='white'
                    >
                      <Checkbox
                        isChecked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                      />
                    </Td>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          borderLeft='1px solid'
                          borderLeftColor='#c3cad8'
                          borderBottom='1px'
                          borderBottomColor='#c3cad8'
                          bg='white'
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                    <Td
                      bg='#ECEDFB'
                      borderLeft='1px dashed'
                      borderRight='1px dashed'
                      borderBottom='1px dashed'
                      borderLeftColor='#c3cad8'
                      borderRightColor='#c3cad8'
                      borderBottomColor='#c3cad8'
                    ></Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        px={2}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        h='44px'
      >
        <Box></Box>
        <Box display='flex' gap={5}>
          <Box>
            <Select
              size='sm'
              rounded='md'
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              value={limit}
            >
              {[2, 5, 10, 20].map((limit) => (
                <option value={limit} key={limit}>
                  {limit} per page
                </option>
              ))}
            </Select>
          </Box>
          <Box display='flex' gap={2} alignItems='center'>
            <IconButton
              size='sm'
              icon={<ChevronLeftIcon />}
              aria-label='go prev button'
              colorScheme='blue'
              variant='outline'
              disabled={currentPage === 1}
              onClick={() => previousPage()}
            ></IconButton>
            {range.map((item, index) => {
              if (item === DOTS) {
                return (
                  <Box
                    w={8}
                    h={8}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <DotsIcon />
                  </Box>
                );
              } else {
                return (
                  <Button
                    key={index}
                    w={8}
                    h={8}
                    onClick={() => setPage(item)}
                    variant={item === currentPage ? 'solid' : 'outline'}
                    colorScheme='blue'
                  >
                    {item}
                  </Button>
                );
              }
            })}
            <IconButton
              size='sm'
              icon={<ChevronRightIcon />}
              aria-label='go next button'
              colorScheme='blue'
              variant='outline'
              onClick={() => nextPage()}
              disabled={data?.paging.total === currentPage}
            ></IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
