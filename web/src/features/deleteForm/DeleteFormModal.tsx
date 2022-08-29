import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useDeleteFormContext } from './DeleteFormContext';
import { useDeleteForm } from './useDeleteForm';

export const DeleteFormModal = () => {
  const [{ deleteFormId, deleteFormLabel }, dispatch] = useDeleteFormContext();
  const [deleteForm, { isLoading }] = useDeleteForm();

  const closeModal = () =>
    dispatch({ type: 'CLOSE_MODAL', payload: undefined });

  return (
    <Modal isOpen={!!deleteFormId} size='xl' onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Delete form</ModalHeader>
        <ModalBody>
          <Text>Are you sure to delete this form ?</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button
              colorScheme='red'
              onClick={() => {
                deleteForm(deleteFormId!).then(() => {
                  closeModal();
                });
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
