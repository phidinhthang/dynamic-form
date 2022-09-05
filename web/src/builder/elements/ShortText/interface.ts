export interface ShortTextElement {
  type: 'SHORT_TEXT';
  data: {
    label: string;
    subLabel: string;
    placeholder: string;
    key: string;
    defaultValue: string;
    validations: {
      isRequired: {
        value: boolean;
        errorMessage: string;
      };
      minLength: {
        value?: number;
        errorMessage: string;
      };
      maxLength: {
        value?: number;
        errorMessage: string;
      };
    };
  };
}
