import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { InputField } from '../../components/InputField';
import { TableColumn } from '../../features/forms/types';
import { closeAddColumnModal, unmountAddColumnModal } from './tableActions';
import { useTableContext } from './TableContext';
import { useAddColumn } from './useAddColumn';

interface AddColumnModalProps {
  formId: string;
}

interface AddColumnModalWrapperProps extends React.PropsWithChildren {}

const AddColumnModalWrapper: React.FC<AddColumnModalWrapperProps> = ({
  children,
}) => {
  const [{ isAddColumnModalMountted }] = useTableContext();
  if (!isAddColumnModalMountted) {
    return <></>;
  }

  return <>{children}</>;
};

export const AddColumnModal: React.FC<AddColumnModalProps> = ({ formId }) => {
  const [addColumn, { isLoading }] = useAddColumn(formId);
  const [{ isAddColumnModalOpen }, tableDispatch] = useTableContext();

  const closeModal = () => tableDispatch(closeAddColumnModal());
  const unmountModal = () => tableDispatch(unmountAddColumnModal());

  const formValidationSchema: yup.SchemaOf<
    Omit<TableColumn, 'id' | 'isHidden'>
  > = yup.object().shape({
    key: yup.string().required('Key is required.'),
    label: yup.string().required('Label is required.'),
    type: yup.string().required('Type is required.') as any,
  });

  return (
    <AddColumnModalWrapper>
      <Formik<Omit<TableColumn, 'id' | 'isHidden'>>
        initialValues={{ key: '', label: '', type: undefined as any }}
        onSubmit={(values) => {
          addColumn({ ...values, id: nanoid(), isHidden: false }).finally(
            closeModal
          );
        }}
        validationSchema={formValidationSchema}
        validateOnBlur
      >
        {({ isValid, errors, touched }) => (
          <Modal
            size='xl'
            isOpen={isAddColumnModalOpen}
            onClose={closeModal}
            onCloseComplete={unmountModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Add column</ModalHeader>
              <Form>
                <ModalBody>
                  <InputField label='Label' name='label' />
                  <Box mt={4}>
                    <InputField label='Key' name='key' />
                  </Box>
                  <Box mt={4}>
                    <FormControl
                      isInvalid={!!errors['type'] && touched['type']}
                    >
                      <FormLabel>Type</FormLabel>
                      <Field
                        as={Select}
                        placeholder='Choose column type'
                        name='type'
                      >
                        <option value='SHORT_TEXT'>Short text</option>
                      </Field>
                      {errors['type'] && touched['type'] && (
                        <FormErrorMessage>{errors['type']}</FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='teal'
                    type='submit'
                    disabled={!isValid}
                    isLoading={isLoading}
                  >
                    Add column
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </Formik>
    </AddColumnModalWrapper>
  );
};
