import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useFormContext } from '../../features/form/FormContext';
import { useBuilderContext } from '../builder/BuilderContext';
import { GenForm } from '../components/GenForm';
import {
  closePostTableDataModal,
  unmountPostTableDataModal,
} from './tableActions';
import { useTableContext } from './TableContext';
import { usePostTableData } from './usePostTableData';

interface PostTableDataModalProps {}

export const PostTableDataModal: React.FC<PostTableDataModalProps> = () => {
  const [{ elements, layout }] = useBuilderContext();
  const [{ isPostTableDataModalOpen }, tableDispatch] = useTableContext();
  const [form] = useFormContext();

  const closeModal = () => {
    tableDispatch(closePostTableDataModal());
  };
  const unmountModal = () => tableDispatch(unmountPostTableDataModal());

  const [postTableData, { isLoading }] = usePostTableData(
    form.data?.postUrl as any
  );

  return (
    <Modal
      isOpen={isPostTableDataModalOpen}
      onClose={closeModal}
      onCloseComplete={unmountModal}
      size='xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Post table data</ModalHeader>
        <ModalBody pb={6}>
          <GenForm
            data={{ elements, layout }}
            onSubmit={(row) => {
              postTableData(row).finally(closeModal);
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
