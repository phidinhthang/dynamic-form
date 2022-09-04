import { DndProvider } from 'react-dnd';
import { BuilderPage } from '../../../builder';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BuilderPageProvider } from '../../../builder/builderPage/BuilderPageContext';
import { FormProvider } from '../../../features/form/FormContext';
import { WaitForFormData } from '../../../builder/components/WaitForFormData';
import { BuilderProvider } from '../../../builder/builder/BuilderContext';
import { EditFormPageProvider } from '../../../builder/components/EditFormPageProvider';

export default function EditTestPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormProvider>
        <BuilderPageProvider>
          <WaitForFormData>
            <EditFormPageProvider>
              <BuilderPage />
            </EditFormPageProvider>
          </WaitForFormData>
        </BuilderPageProvider>
      </FormProvider>
    </DndProvider>
  );
}
