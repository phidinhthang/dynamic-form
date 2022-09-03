import { useRouter } from 'next/router';
import { ReceiveFormData } from '../../../builder/components/ReceiveFormData';
import { WaitForFormData } from '../../../builder/components/WaitForFormData';
import { AddColumnModal } from '../../../builder/table/AddColumnModal';
import { TablePage } from '../../../builder/TablePage';
import { FormProvider } from '../../../features/form/FormContext';

export default function Page() {
  const router = useRouter();

  return (
    <FormProvider>
      <WaitForFormData>
        <ReceiveFormData>
          <TablePage />
          <AddColumnModal formId={router.query.formId as string} />
        </ReceiveFormData>
      </WaitForFormData>
    </FormProvider>
  );
}
