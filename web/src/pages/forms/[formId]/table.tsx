import { WaitForFormData } from '../../../builder/components/WaitForFormData';
import { TablePage } from '../../../builder/TablePage';
import { FormProvider } from '../../../features/form/FormContext';

export default function Page() {
  return (
    <FormProvider>
      <WaitForFormData>
        <TablePage />
      </WaitForFormData>
    </FormProvider>
  );
}
