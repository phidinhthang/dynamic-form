import {
  BuilderElement,
  FieldElementType,
} from '../../builder/builder/builderReducer';

export interface TableColumn {
  id?: string;
  label: string;
  key: string;
  type: FieldElementType;
}

export interface Form {
  id: string;
  label: string;
  listUrl: string;
  postUrl?: string;
  deleteUrl?: string;
  updateUrl?: string;
  layout: string[];
  elements: Record<string, BuilderElement>;
  columns: TableColumn[];
  createdAt: string;
  updatedAt?: string;
}

export type CommonFieldValidations = {
  required?: {
    value: boolean;
    errorMessage: string;
  };
};

export type NumberFieldValidations = {
  min?: {
    value: number;
    errorMessage: string;
  };
  max?: {
    value: number;
    errorMessage: string;
  };
};

export type StringFieldValidations = {
  minLength?: {
    value: number;
    errorMessage: string;
  };
  maxLength?: {
    value: number;
    errorMessage: string;
  };
  isEmail?: {
    value: string;
    errorMessage: string;
  };
  regexp?: {
    value: string;
    errorMessage: string;
  };
};

export type FieldValidations = CommonFieldValidations &
  StringFieldValidations &
  NumberFieldValidations;

export interface Field {
  key: string;
  label: string;
  type: 'number' | 'string';
  default?: number | string;
  validations: FieldValidations;
}
