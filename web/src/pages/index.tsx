import {
  Box,
  Button,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AddIcon, ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import type { NextPage } from 'next';
import React from 'react';
import { useGetForms } from '../features/forms/useGetForms';
import { useCreateFormsContext } from '../features/createForm/CreateFormContext';
import { useDeleteFormContext } from '../features/deleteForm/DeleteFormContext';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [, createFormDispatch] = useCreateFormsContext();
  const [, deleteFormDispatch] = useDeleteFormContext();
  const { data, error, isLoading } = useGetForms({ refetch: true });
  const router = useRouter();

  return (
    <Box>
      <Box maxW={960} mx='auto'>
        <Button
          leftIcon={<AddIcon />}
          my='3'
          onClick={() => {
            createFormDispatch({ type: 'OPEN_MODAL', payload: undefined });
          }}
        >
          Create new form
        </Button>
        <TableContainer
          rounded='md'
          borderWidth={1}
          borderColor='gray.100'
          borderBottomWidth={0}
        >
          <Table variant='simple' rounded='sm' px='2' py='1'>
            <Thead>
              <Tr>
                <Th>Label</Th>
                <Th>Created At</Th>
                <Th>Last Updated At</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((form, index) => (
                <Tr key={index}>
                  <Td>{form.label}</Td>
                  <Td>{new Date(form.createdAt).toLocaleString()}</Td>
                  <Td>{new Date(form.updatedAt!).toLocaleString()}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<ViewIcon />}
                        aria-label='view form'
                        onClick={() => router.push(`/forms/${form.id}/table`)}
                      />
                      <IconButton
                        colorScheme='blue'
                        icon={<EditIcon />}
                        aria-label='edit form'
                        onClick={() => router.push(`/forms/${form.id}/edit`)}
                      />
                      <IconButton
                        colorScheme='red'
                        icon={<DeleteIcon />}
                        aria-label='delete form'
                        onClick={() =>
                          deleteFormDispatch({
                            type: 'OPEN_MODAL',
                            payload: {
                              deleteFormId: form.id,
                              deleteFormLabel: form.label,
                            },
                          })
                        }
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Home;
