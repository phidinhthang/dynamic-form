import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { InputField } from '../../components/InputField';
import { URL_REGEXP } from '../../utils/constants';
import { toErrorMap } from '../../utils/toErrorMap';
import { ToNullish } from '../../utils/types/ToNullish';
import { useCreateFormsContext } from './CreateFormContext';
import { CreateFormBody } from './types';
import { useCreateForm } from './useCreateForm';

interface CreateFormModalWrapperProps extends React.PropsWithChildren {}

const CreateFormModalWrapper: React.FC<CreateFormModalWrapperProps> = ({
  children,
}) => {
  const [state] = useCreateFormsContext();

  if (!state.isModalMountted) {
    return <></>;
  }

  return <>{children}</>;
};

interface CreateFormModalProps {}

export const CreateFormModal: React.FC<CreateFormModalProps> = () => {
  const [{ isModalOpen }, dispatch] = useCreateFormsContext();
  const [createForm, { data, error, isLoading }] = useCreateForm();

  // @ts-ignore
  const formValidationSchema: yup.SchemaOf<ToNullish<CreateFormBody>> = yup
    .object()
    .shape({
      label: yup.string().required('Label is required.'),
      listUrl: yup
        .string()
        .required('List url is required.')
        .matches(URL_REGEXP, 'List url must be a valid url.'),
      postUrl: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable()
        .matches(URL_REGEXP, 'Post url must be a valid url.'),
      updateUrl: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable()
        .matches(URL_REGEXP, 'Update url must be a valid url.'),
      deleteUrl: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable()
        .matches(URL_REGEXP, 'Delete url must be a valid url.'),
    });

  const closeModal = () =>
    dispatch({ type: 'CLOSE_MODAL', payload: undefined });
  const unmountModal = () =>
    dispatch({ type: 'UNMOUNT_MODAL', payload: undefined });

  return (
    <CreateFormModalWrapper>
      <Formik<CreateFormBody>
        initialValues={{
          label: '',
          listUrl: '',
          postUrl: '',
          updateUrl: '',
          deleteUrl: '',
        }}
        onSubmit={(values, { setErrors }) => {
          createForm(values)
            .then((error) => {
              if ('errors' in error) {
                setErrors(toErrorMap(error.errors));
              }
            })
            .finally(closeModal);
        }}
        validationSchema={formValidationSchema}
        validateOnBlur
      >
        {({ isValid }) => (
          <Modal
            size={'xl'}
            isOpen={isModalOpen}
            onClose={closeModal}
            onCloseComplete={unmountModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Create new form</ModalHeader>
              <Form>
                <ModalBody>
                  <InputField label='Label' name='label' />
                  <Box mt={4}>
                    <InputField label='List url' name='listUrl' />
                  </Box>
                  <Box mt={4}>
                    <InputField label='Post url' name='postUrl' />
                  </Box>
                  <Box mt={4}>
                    <InputField label='Update url' name='updateUrl' />
                  </Box>
                  <Box mt={4}>
                    <InputField label='Delete url' name='deleteUrl' />
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='teal'
                    type='submit'
                    isLoading={isLoading}
                    disabled={!isValid}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </Formik>
    </CreateFormModalWrapper>
  );
};
