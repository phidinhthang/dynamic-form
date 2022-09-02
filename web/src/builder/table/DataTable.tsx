import {
  Box,
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

interface DataTableProps {
  listUrl: string;
  columns: TableColumn[];
}

export const DataTable: React.FC<DataTableProps> = ({ listUrl, columns }) => {
  const { data } = useGetTableData(listUrl);
  // console.log('data ', data, 'colmns ', columns);
  const headers = React.useMemo<ColumnDef<TableColumn, any>[]>(() => {
    return columns.map((col) => ({ accessorKey: col.key, header: col.label }));
  }, [columns]);

  const table = useReactTable<TableColumn>({
    data: data as any,
    columns: headers,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <Box>
      <TableContainer
        borderWidth={1}
        borderColor={'gray.100'}
        borderRadius={12}
        width='full'
        maxW={900}
        mx='auto'
        px={4}
      >
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan}>
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
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
