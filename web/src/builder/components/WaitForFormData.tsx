import { useRouter } from 'next/router';
import React from 'react';
import { useGetForm } from '../../features/form/useGetForm';
import { BuilderProvider } from '../builder/BuilderContext';
import { BuilderElement } from '../builder/builderReducer';

interface WaitForFormDataProps extends React.PropsWithChildren {}

export const WaitForFormData: React.FC<WaitForFormDataProps> = ({
  children,
}) => {
  const router = useRouter();
  const formId = router.query.formId as string;
  const { data, isLoading, error } = useGetForm(formId, {
    refetch: router.isReady,
  });

  const elements = React.useMemo(() => {
    if (!data) return;

    return Object.entries(data.elements).reduce((acc, [key, value]) => {
      acc[key] = { ...value, buildErrors: [], isTouched: false };
      return acc;
    }, {} as Record<string, BuilderElement>);
  }, [data?.elements]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log('error ', error);
    return <div>an error occur.</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <BuilderProvider
      initialValues={{ elements: elements!, layout: data.layout }}
    >
      {children}
    </BuilderProvider>
  );
};
