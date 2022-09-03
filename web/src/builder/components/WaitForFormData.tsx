import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useGetForm } from '../../features/form/useGetForm';

interface WaitForFormDataProps extends React.PropsWithChildren {}

export const WaitForFormData: React.FC<WaitForFormDataProps> = ({
  children,
}) => {
  const router = useRouter();
  const formId = router.query.formId as string;
  useGetForm(formId, {
    refetch: router.isReady,
  });

  // @todo: handle error with error boundary

  if (!router.isReady) {
    return <div>loading...</div>;
  }

  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
};
