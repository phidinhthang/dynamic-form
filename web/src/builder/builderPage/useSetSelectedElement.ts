import { setElementTouched } from '../builder/builderActions';
import { useBuilderContext } from '../builder/BuilderContext';
import {
  setInspectElementId,
  setSelectedElementId,
} from './builderPageActions';
import { useBuilderPageContext } from './BuilderPageContext';

export const useSetSelectedElement = () => {
  const [, builderDispatch] = useBuilderContext();
  const [{ selectedElementId, inspectedElementId }, builderPageDispatch] =
    useBuilderPageContext();

  const setSelectedElement = (elementId: string) => {
    if (selectedElementId) {
      builderDispatch(setElementTouched(selectedElementId));
    }
    if (selectedElementId !== elementId) {
      builderPageDispatch(setSelectedElementId(elementId));

      if (inspectedElementId) {
        builderPageDispatch(setInspectElementId(elementId));
      }
    }
  };

  return setSelectedElement;
};
