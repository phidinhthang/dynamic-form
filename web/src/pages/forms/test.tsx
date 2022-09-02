import { GenForm } from '../../builder/components/GenForm';

export default function Test() {
  return (
    <GenForm
      data={{
        layout: [
          '5SGHuNLhGndyVp5mzpKcp',
          'zPZM59d7B7FgyzJ5qDQ0S',
          'dqlLINA9Bx0Bh6GJSNP1a',
        ],
        elements: {
          dqlLINA9Bx0Bh6GJSNP1a: {
            id: 'dqlLINA9Bx0Bh6GJSNP1a',
            parentId: 'root',
            type: 'SUBMIT_BUTTON',
            children: [],
            data: {},
          },
          '5SGHuNLhGndyVp5mzpKcp': {
            id: '5SGHuNLhGndyVp5mzpKcp',
            parentId: 'root',
            type: 'SHORT_TEXT',
            children: [],
            data: {
              label: 'Type a label',
              subLabel: '',
              placeholder: '',
              key: '',
              defaultValue: '',
              validations: {
                isRequired: {
                  value: false,
                  errorMessage: '',
                },
                minLength: {
                  errorMessage: 'min length',
                  value: 3,
                },
                maxLength: {
                  errorMessage: '',
                },
              },
            },
          },
          hpjFe8WWh8XIiwks7Z0kT: {
            id: 'hpjFe8WWh8XIiwks7Z0kT',
            parentId: 'zPZM59d7B7FgyzJ5qDQ0S',
            type: 'SHORT_TEXT',
            children: [],
            data: {
              label: 'Type a label',
              subLabel: '',
              placeholder: '',
              key: '',
              defaultValue: '',
              validations: {
                isRequired: {
                  value: false,
                  errorMessage: '',
                },
                minLength: {
                  errorMessage: '',
                },
                maxLength: {
                  errorMessage: '',
                },
              },
            },
          },
          zPZM59d7B7FgyzJ5qDQ0S: {
            id: 'zPZM59d7B7FgyzJ5qDQ0S',
            parentId: 'root',
            type: 'EDIT_BOX',
            children: ['hpjFe8WWh8XIiwks7Z0kT'],
            data: {},
          },
        },
      }}
    ></GenForm>
  );
}
