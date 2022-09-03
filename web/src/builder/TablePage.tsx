import { useFormContext } from '../features/form/FormContext';
import { DataTable } from './table/DataTable';

export const TablePage = () => {
  const [{ data, isLoading }] = useFormContext();

  if (isLoading) {
    return <div>is loading</div>;
  }

  if (!data) {
    return <div>no data provided</div>;
  }

  return (
    <>
      <DataTable listUrl={data.listUrl} />
    </>
  );
};
