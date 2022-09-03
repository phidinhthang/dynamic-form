import {
  Box,
  Button,
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
import { openAddColumnModal } from './tableActions';
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons';
import { ColumnsPopover } from './ColumnsPopover';

interface DataTableProps {
  listUrl: string;
}

export const DataTable: React.FC<DataTableProps> = ({ listUrl }) => {
  const { data } = useGetTableData(listUrl);
  const [{ columns }, tableDispatch] = useTableContext();
  const [{ elements }, formDispatch] = useFormDataContext();

  // console.log('data ', data, 'colmns ', columns);
  const headers = React.useMemo<ColumnDef<TableColumn, any>[]>(() => {
    return columns.map((col) => ({ accessorKey: col.key, header: col.label }));
  }, [columns]);
  console.log('headers ', headers);

  const table = useReactTable<TableColumn>({
    data: data as any,
    columns: headers,
    getCoreRowModel: getCoreRowModel(),
  });

  const onOpenAddColumnModal = () => tableDispatch(openAddColumnModal());

  if (!data) {
    return <div>loading...</div>;
  }

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
              <option value={column.key}>{column.label}</option>
            ))}
          </Select>
          <Input />
        </Box>
        <Box>
          <ColumnsPopover columns={columns} />
        </Box>
      </Box>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <Text>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Text>
                    )}
                  </th>
                );
              })}
              <th>
                <button onClick={onOpenAddColumnModal}>add</button>
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
                <td style={{ backgroundColor: 'gray' }}></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};
