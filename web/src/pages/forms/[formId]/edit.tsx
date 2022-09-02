import { DndProvider } from 'react-dnd';
import { BuilderPage } from '../../../builder';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BuilderPageProvider } from '../../../builder/builderPage/BuilderPageContext';
import { FormProvider } from '../../../features/form/FormContext';
import { WaitForFormData } from '../../../builder/components/WaitForFormData';

export default function EditTestPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormProvider>
        <BuilderPageProvider>
          <WaitForFormData>
            <BuilderPage />
          </WaitForFormData>
        </BuilderPageProvider>
      </FormProvider>
    </DndProvider>
  );
}
