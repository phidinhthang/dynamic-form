import { useFormContext } from '../../features/form/FormContext';
import { BuilderProvider } from '../builder/BuilderContext';
import { BuilderElement, initialValues } from '../builder/builderReducer';
import { TableProvider } from '../table/TableContext';

interface ReceiveFormDataProps extends React.PropsWithChildren {}

export const ReceiveFormData: React.FC<ReceiveFormDataProps> = ({
  children,
}) => {
  const [{ data }] = useFormContext();

  if (!data) {
    return (
      <BuilderProvider initialValues={initialValues}>
        {children}
      </BuilderProvider>
    );
  }

  const elements = Object.entries(data.elements).reduce((acc, [key, value]) => {
    acc[key] = { ...value, buildErrors: [], isTouched: false };
    return acc;
  }, {} as Record<string, BuilderElement>);

  return (
    <BuilderProvider initialValues={{ elements, layout: data.layout }}>
      <TableProvider initialValues={{ columns: data.columns }}>
        {children}
      </TableProvider>
    </BuilderProvider>
  );
};
