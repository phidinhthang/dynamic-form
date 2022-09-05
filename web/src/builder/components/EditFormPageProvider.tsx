import { useFormContext } from '../../features/form/FormContext';
import { BuilderProvider } from '../builder/BuilderContext';
import { initialValues } from '../builder/builderReducer';
import { BuilderElement } from '../elements/types';

export interface EditFormPageProviderProps extends React.PropsWithChildren {}

export const EditFormPageProvider: React.FC<EditFormPageProviderProps> = ({
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
      {children}
    </BuilderProvider>
  );
};
