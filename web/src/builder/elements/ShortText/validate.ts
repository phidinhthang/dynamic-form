import { ExactBuilderElement } from '../../builder/builderReducer';

export const validate = (element: ExactBuilderElement<'SHORT_TEXT'>) => {
  if (!element.data.key) {
    return {
      id: element.id,
      type: 'SHORT_TEXT',
    };
  }
};
