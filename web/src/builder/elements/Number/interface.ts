export interface NumberElement {
  type: 'NUMBER';
  data: {
    label: string;
    subLabel: string;
    placeholder: string;
    key: string;
    defaultValue?: number;
    validations: {
      isRequired: {
        value: boolean;
        errorMessage: string;
      };
      min: {
        value?: number;
        errorMessage: string;
      };
      max: {
        value?: number;
        errorMessage: string;
      };
    };
  };
}
