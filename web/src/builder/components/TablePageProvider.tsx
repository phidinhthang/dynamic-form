import { useFormContext } from '../../features/form/FormContext';
import { BuilderProvider } from '../builder/BuilderContext';
import { BuilderElement, initialValues } from '../builder/builderReducer';
import { TableProvider } from '../table/TableContext';

interface TablePageProviderProps extends React.PropsWithChildren {}

export const TablePageProvider: React.FC<TablePageProviderProps> = ({
  children,
}) => {
  const [{ data }] = useFormContext();

  if (!data) {
    return <>{children}</>;
  }

  const elements = Object.entries(data.elements).reduce((acc, [key, value]) => {
    acc[key] = { ...value, buildErrors: [], isTouched: false };
    return acc;
  }, {} as Record<string, BuilderElement>);

  return (
    <BuilderProvider initialValues={{ elements, layout: data.layout }}>
      <TableProvider
        initialValues={{
          columns: data.columns,
          isAddColumnModalMountted: false,
          isAddColumnModalOpen: false,
          isColumnsPopoverOpen: false,
          isPostTableDataModalMountted: false,
          isPostTableDataModalOpen: false,
          selectedRowIds: [],
          table: {
            isLoading: false,
          },
          isDeleteTableDataModalOpen: false,
        }}
      >
        {children}
      </TableProvider>
    </BuilderProvider>
  );
};
