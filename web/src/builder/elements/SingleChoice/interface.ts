export interface SingleChoiceElement {
  type: 'SINGLE_CHOICE';
  data: {
    label: string;
    key: string;
    defaultSelectedId?: string;
    options: SingleChoiceOptionElement[];
    validations: {
      isRequired: {
        value: boolean;
        errorMessage: string;
      };
    };
  };
}

export interface SingleChoiceOptionElement {
  id: string;
  label: string;
  value?: string;
}
