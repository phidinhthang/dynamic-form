import { ShortTextElement } from './ShortText/interface';
import { EditBoxElement } from './EditBox/interface';
import { SubmitButtonElement } from './SubmitButton/interface';
import { NumberElement } from './Number/interface';
import { SingleChoiceElement } from './SingleChoice/interface';

export type ElementBuildError = {
  errorKey: string;
  message: string;
};

export interface BaseBuilderElement {
  id: string;
  children: string[];
  parentId: string;
  buildErrors: ElementBuildError[];
  isTouched: boolean;
}

export type AllBuilderElement = {
  SHORT_TEXT: ShortTextElement;
  EDIT_BOX: EditBoxElement;
  SUBMIT_BUTTON: SubmitButtonElement;
  NUMBER: NumberElement;
  SINGLE_CHOICE: SingleChoiceElement;
};

export type ElementType = keyof AllBuilderElement;

export type ExactBuilderElement<T extends ElementType> = BaseBuilderElement &
  AllBuilderElement[T];

export type BuilderElement = ExactBuilderElement<ElementType>;

export interface BuilderCtx {
  layout: string[];
  elements: Record<string, BuilderElement>;
}
type _AllFieldElement = {
  [K in keyof AllBuilderElement]: Extract<
    AllBuilderElement[K],
    { data: { key: string } }
  >;
};

export type FieldElementType = {
  [K in keyof _AllFieldElement]: _AllFieldElement[K] extends never ? never : K;
}[keyof _AllFieldElement];

export type FieldElement = _AllFieldElement[keyof _AllFieldElement] &
  BaseBuilderElement;
export type ExactFieldElement<T extends FieldElementType> = _AllFieldElement[T];
