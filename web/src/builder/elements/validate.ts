import { BuilderElement, ElementType } from '../builder/builderReducer';

type BuilderElementError = {
  id: string;
  type: ElementType;
  message: string;
};

export const validate = (elements: BuilderElement[]) => {
  const errors: BuilderElementError[] = [];

  elements.forEach((element) => {
    if (element.type === 'EDIT_BOX') return;
  });
};
