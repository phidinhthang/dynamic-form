import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { FormsProvider } from '../features/forms/FormsContext';
import { CreateFormProvider } from '../features/createForm/CreateFormContext';
import { CreateFormModal } from '../features/createForm/CreateFormModal';
import { DeleteFormProvider } from '../features/deleteForm/DeleteFormContext';
import { DeleteFormModal } from '../features/deleteForm/DeleteFormModal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FormsProvider>
      <CreateFormProvider>
        <DeleteFormProvider>
          <ChakraProvider>
            <Component {...pageProps} />
            <CreateFormModal />
            <DeleteFormModal />
          </ChakraProvider>
        </DeleteFormProvider>
      </CreateFormProvider>
    </FormsProvider>
  );
}

export default MyApp;
