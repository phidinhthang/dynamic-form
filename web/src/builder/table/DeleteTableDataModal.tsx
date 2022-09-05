import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useFormContext } from '../../features/form/FormContext';
import { closeDeleteTableDataModal } from './tableActions';
import { useTableContext } from './TableContext';
import { useDeleteTableData } from './useDeleteTableData';

export const DeleteTableDataModal = () => {
  const [{ isDeleteTableDataModalOpen, selectedRowIds }, tableDispatch] =
    useTableContext();
  const [{ data }] = useFormContext();
  const [deleteTableData, { isLoading }] = useDeleteTableData(
    data?.deleteUrl as any
  );

  const closeModal = () => tableDispatch(closeDeleteTableDataModal());

  return (
    <Modal
      isOpen={isDeleteTableDataModalOpen && selectedRowIds.length === 1}
      size='xl'
      onClose={closeModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete row</ModalHeader>
        <ModalBody>
          <Text>Are you sure to delete this row ?</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button
              colorScheme='red'
              onClick={() => {
                deleteTableData(selectedRowIds[0]).finally(closeModal);
              }}
              isLoading={isLoading}
            >
              Delete
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
