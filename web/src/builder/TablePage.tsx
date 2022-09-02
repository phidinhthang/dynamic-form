import { useFormContext } from '../features/form/FormContext';
import { DataTable } from './table/DataTable';

export const TablePage = () => {
  const [{ data }] = useFormContext();

  if (!data) {
    return <div>no data provided</div>;
  }

  return (
    <>
      <DataTable columns={data.columns} listUrl={data.listUrl} />
    </>
  );
};
