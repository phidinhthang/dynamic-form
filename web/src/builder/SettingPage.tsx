import { Box, Button, Heading, Portal, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NavLink } from '../components/NavLink';
import * as yup from 'yup';
import { ToNullish } from '../utils/types/ToNullish';
import { CreateFormBody } from '../features/createForm/types';
import { URL_REGEXP } from '../utils/constants';
import { Form, Formik, FormikHelpers } from 'formik';
import { useFormContext } from '../features/form/FormContext';
import { InputField } from '../components/InputField';
import { useUpdateForm } from '../features/updateForm/useUpdateForm';

export const SettingPage = () => {
  const router = useRouter();
  const formId = router.query.formId as string;
  const [{ data }] = useFormContext();
  const [updateForm, { isLoading }] = useUpdateForm();
  const toast = useToast();

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

  if (!data) {
    return <></>;
  }

  return (
    <Box>
      <Portal>
        <Box
          w='full'
          h='40px'
          bg='twitter.500'
          display='flex'
          justifyContent='center'
          position='fixed'
          top='0'
          left='0'
          right='0'
        >
          <Box display='inline-flex'>
            <NavLink
              to={`/forms/${formId}/edit`}
              color='white'
              fontWeight='semibold'
              fontSize='lg'
              h='full'
              display='flex'
              alignItems='center'
              justifyContent='center'
              letterSpacing={0.3}
              textTransform='uppercase'
              px={4}
              _hover={{ bg: 'twitter.400' }}
              activeProps={{ bg: 'twitter.400' }}
            >
              Build
            </NavLink>
            <NavLink
              to={`/forms/${formId}/setting`}
              color='white'
              fontWeight='semibold'
              fontSize='lg'
              display='flex'
              alignItems='center'
              justifyContent='center'
              letterSpacing={0.3}
              textTransform='uppercase'
              px={4}
              _hover={{ bg: 'twitter.400' }}
              activeProps={{ bg: 'twitter.400' }}
            >
              Setting
            </NavLink>
          </Box>
        </Box>
      </Portal>

      <Box mt='40px'>
        <Box w='full' px={4} maxW={720} mx='auto' mt={16}>
          <Heading as='h2' my={8}>
            Edit form setting
          </Heading>
          <Formik<Partial<Omit<CreateFormBody, 'id'>>>
            initialValues={{
              label: data.label,
              deleteUrl: data.deleteUrl,
              listUrl: data.listUrl,
              postUrl: data.postUrl,
              updateUrl: data.updateUrl,
            }}
            onSubmit={(values) => {
              updateForm(formId, values).then(() =>
                toast({
                  position: 'top-right',
                  status: 'success',
                  description: 'Update form setting successfully!',
                })
              );
            }}
            validationSchema={formValidationSchema}
            validateOnBlur
          >
            {({ isValid }) => (
              <Form>
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

                <Box mt={4}>
                  <Button
                    colorScheme='teal'
                    disabled={!isValid}
                    type='submit'
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};
