import { DndProvider } from 'react-dnd';
import { BuilderPage } from '../../builder/BuilderPage';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BuilderProvider } from '../../builder/builder/BuilderContext';
import { BuilderPageProvider } from '../../builder/builderPage/BuilderPageContext';

export default function EditTestPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderProvider>
        <BuilderPageProvider>
          <BuilderPage />
        </BuilderPageProvider>
      </BuilderProvider>
    </DndProvider>
  );
}
