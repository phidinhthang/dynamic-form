import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {
  changeElementData,
  changeElementKey,
} from '../../builder/builderActions';
import { useBuilderContext } from '../../builder/BuilderContext';
import { ExactBuilderElement } from '../types';

interface NumberInspectorProps {
  element: ExactBuilderElement<'NUMBER'>;
}

export const NumberInspector: React.FC<NumberInspectorProps> = ({
  element,
}) => {
  const [, builderDispatch] = useBuilderContext();

  return (
    <Tabs isFitted>
      <TabList>
        <Tab>General</Tab>
        <Tab>Options</Tab>
        <Tab>Advance</Tab>
      </TabList>
      <TabPanels>
        <TabPanel mx={-1}>
          <Box>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input
                value={element.data.label}
                onChange={(e) => {
                  builderDispatch(
                    changeElementData<'NUMBER'>()({
                      id: element.id,
                      data: { label: e.target.value },
                    })
                  );
                }}
              />
              <FormHelperText>Type your label</FormHelperText>
            </FormControl>
            <FormControl mt={8}>
              <FormLabel>Required</FormLabel>
              <Switch
                size='lg'
                isChecked={element.data.validations.isRequired.value}
                onChange={(e) => {
                  builderDispatch(
                    changeElementData<'NUMBER'>()({
                      id: element.id,
                      data: {
                        validations: {
                          isRequired: { value: e.target.checked },
                        },
                      },
                    })
                  );
                }}
              >
                <FormHelperText>
                  Prevent submition if this input is empty.
                </FormHelperText>
              </Switch>
            </FormControl>
            {element.data.validations.isRequired.value && (
              <FormControl mt={4}>
                <FormLabel fontSize='sm'>Required error message</FormLabel>
                <Input
                  size='sm'
                  fontSize='sm'
                  rounded='md'
                  placeholder='Customize the required error message'
                  value={element.data.validations.isRequired.errorMessage}
                  onChange={(e) =>
                    builderDispatch(
                      changeElementData<'NUMBER'>()({
                        id: element.id,
                        data: {
                          validations: {
                            isRequired: {
                              errorMessage: e.target.value,
                            },
                          },
                        },
                      })
                    )
                  }
                />
              </FormControl>
            )}
            <FormControl mt={8} isRequired={true}>
              <FormLabel>Key</FormLabel>
              <Input
                value={element.data.key}
                onChange={(e) =>
                  builderDispatch(changeElementKey(element.id, e.target.value))
                }
              />
              <FormHelperText>
                The field can be used to pre-populate fields from URL and to
                pass data to another form automatically. It is also important
                that there should be no spaces in between.
              </FormHelperText>
            </FormControl>
          </Box>
        </TabPanel>
        <TabPanel mx={-1}>
          <Box>
            <FormControl>
              <FormLabel>Placeholder</FormLabel>
              <Input
                value={element.data.placeholder}
                onChange={(e) =>
                  builderDispatch(
                    changeElementData<'NUMBER'>()({
                      id: element.id,
                      data: { placeholder: e.target.value },
                    })
                  )
                }
              />
              <FormHelperText>
                Set placeholder of the input field.
              </FormHelperText>
            </FormControl>
            <FormControl mt={8}>
              <FormLabel>Default value</FormLabel>
              <NumberInput
                value={element.data.defaultValue}
                onChange={(_, value) =>
                  builderDispatch(
                    changeElementData<'NUMBER'>()({
                      id: element.id,
                      data: {
                        defaultValue: isNaN(value) ? ('' as any) : value,
                      },
                    })
                  )
                }
              />
              <FormHelperText>
                Set default value of the input field.
              </FormHelperText>
            </FormControl>
            <FormControl mt={8}>
              <FormLabel>Min</FormLabel>
              <NumberInput
                value={element.data.validations.min.value}
                max={
                  typeof element.data.validations.max.value === 'number'
                    ? element.data.validations.max.value
                    : undefined
                }
                onChange={(_, value) => {
                  builderDispatch(
                    changeElementData<'NUMBER'>()({
                      id: element.id,
                      data: {
                        validations: {
                          min: {
                            value: Number.isNaN(value) ? ('' as any) : value,
                          },
                        },
                      },
                    })
                  );
                }}
              >
                <NumberInputField value={element.data.validations.min.value} />
              </NumberInput>
            </FormControl>
            {typeof element.data.validations.min.value === 'number' && (
              <FormControl mt={4}>
                <FormLabel fontSize='sm'>Min error message</FormLabel>
                <Input
                  size='sm'
                  fontSize='sm'
                  rounded='md'
                  placeholder='Customize the min error message'
                  value={element.data.validations.min.errorMessage}
                  onChange={(e) =>
                    builderDispatch(
                      changeElementData<'NUMBER'>()({
                        id: element.id,
                        data: {
                          validations: {
                            min: {
                              errorMessage: e.target.value,
                            },
                          },
                        },
                      })
                    )
                  }
                />
              </FormControl>
            )}
            <FormControl mt={8}>
              <FormLabel>Max</FormLabel>
              <NumberInput
                value={element.data.validations.max.value}
                min={
                  typeof element.data.validations.min.value === 'number'
                    ? element.data.validations.min.value
                    : undefined
                }
                onChange={(_, value) =>
                  builderDispatch(
                    changeElementData<'NUMBER'>()({
                      id: element.id,
                      data: {
                        validations: {
                          max: {
                            value: Number.isNaN(value) ? ('' as any) : value,
                          },
                        },
                      },
                    })
                  )
                }
              >
                <NumberInputField />
              </NumberInput>
              <FormHelperText>Set max of the input field.</FormHelperText>
            </FormControl>
            {typeof element.data.validations.max.value === 'number' && (
              <FormControl mt={4}>
                <FormLabel fontSize='sm'>Max error message</FormLabel>
                <Input
                  size='sm'
                  fontSize='sm'
                  rounded='sm'
                  placeholder='Customize the max error message.'
                  value={element.data.validations.max.errorMessage}
                  onChange={(e) =>
                    builderDispatch(
                      changeElementData<'NUMBER'>()({
                        id: element.id,
                        data: {
                          validations: {
                            max: {
                              errorMessage: e.target.value,
                            },
                          },
                        },
                      })
                    )
                  }
                />
              </FormControl>
            )}
          </Box>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
