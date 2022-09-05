import { useRouter } from 'next/router';
import { TablePageProvider } from '../../../builder/components/TablePageProvider';
import { WaitForFormData } from '../../../builder/components/WaitForFormData';
import { AddColumnModal } from '../../../builder/table/AddColumnModal';
import { DeleteTableDataModal } from '../../../builder/table/DeleteTableDataModal';
import { PostTableDataModal } from '../../../builder/table/PostTableDataModal';
import { TablePage } from '../../../builder/TablePage';
import { FormProvider } from '../../../features/form/FormContext';

export default function Page() {
  const router = useRouter();

  return (
    <FormProvider>
      <WaitForFormData>
        <TablePageProvider>
          <TablePage />
          <AddColumnModal formId={router.query.formId as string} />
          <PostTableDataModal />
          <DeleteTableDataModal />
        </TablePageProvider>
      </WaitForFormData>
    </FormProvider>
  );
}
