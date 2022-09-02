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
import { ExactBuilderElement } from '../../builder/builderReducer';
import { useBuilderPageContext } from '../../builderPage/BuilderPageContext';

interface ShortTextInspectorProps {
  element: ExactBuilderElement<'SHORT_TEXT'>;
}

export const ShortTextInspector: React.FC<ShortTextInspectorProps> = ({
  element,
}) => {
  const [, builderPageDispatch] = useBuilderPageContext();
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
              <FormLabel>Question Text</FormLabel>
              <Input
                value={element.data.label}
                onChange={(e) => {
                  builderDispatch(
                    changeElementData<'SHORT_TEXT'>()({
                      id: element.id,
                      data: { label: e.target.value },
                    })
                  );
                }}
              />
              <FormHelperText>Type your question</FormHelperText>
            </FormControl>
            <FormControl mt={8}>
              <FormLabel>Required</FormLabel>
              <Switch
                size='lg'
                isChecked={element.data.validations.isRequired.value}
                onChange={(e) => {
                  builderDispatch(
                    changeElementData<'SHORT_TEXT'>()({
                      id: element.id,
                      data: {
                        validations: {
                          isRequired: { value: e.target.checked },
                        },
                      },
                    })
                  );
                }}
              ></Switch>
              <FormHelperText>
                Prevent submition if this input is empty.
              </FormHelperText>
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
                      changeElementData<'SHORT_TEXT'>()({
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
            {element.type === 'SHORT_TEXT' ? (
              <>
                <FormControl>
                  <FormLabel>Placeholder</FormLabel>
                  <Input
                    value={element.data.placeholder}
                    onChange={(e) =>
                      builderDispatch(
                        changeElementData<'SHORT_TEXT'>()({
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
                  <Input
                    value={element.data.defaultValue}
                    onChange={(e) =>
                      builderDispatch(
                        changeElementData<'SHORT_TEXT'>()({
                          id: element.id,
                          data: { defaultValue: e.target.value },
                        })
                      )
                    }
                  />
                  <FormHelperText>
                    Set default value of the input field.
                  </FormHelperText>
                </FormControl>
                <FormControl mt={8}>
                  <FormLabel>Min Length</FormLabel>
                  <NumberInput
                    value={element.data.validations.minLength.value}
                    onChange={(_, value) => {
                      builderDispatch(
                        changeElementData<'SHORT_TEXT'>()({
                          id: element.id,
                          data: {
                            validations: {
                              minLength: {
                                value: Number.isNaN(value)
                                  ? ('' as any)
                                  : value,
                              },
                            },
                          },
                        })
                      );
                    }}
                  >
                    <NumberInputField
                      value={element.data.validations.minLength.value}
                    />
                  </NumberInput>
                  <FormHelperText>
                    Set min length of the input field.
                  </FormHelperText>
                </FormControl>
                {typeof element.data.validations.minLength.value ===
                  'number' && (
                  <FormControl mt={4}>
                    <FormLabel fontSize='sm'>
                      Min length error message
                    </FormLabel>
                    <Input
                      size='sm'
                      fontSize='sm'
                      rounded='md'
                      placeholder='Customize the min length error message'
                      value={element.data.validations.minLength.errorMessage}
                      onChange={(e) =>
                        builderDispatch(
                          changeElementData<'SHORT_TEXT'>()({
                            id: element.id,
                            data: {
                              validations: {
                                minLength: {
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
                  <FormLabel>Max Length</FormLabel>
                  <NumberInput
                    value={element.data.validations.maxLength.value}
                    onChange={(_, value) => {
                      builderDispatch(
                        changeElementData<'SHORT_TEXT'>()({
                          id: element.id,
                          data: {
                            validations: {
                              maxLength: {
                                value: Number.isNaN(value)
                                  ? ('' as any)
                                  : value,
                              },
                            },
                          },
                        })
                      );
                    }}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <FormHelperText>
                    Set max length of the input field.
                  </FormHelperText>
                </FormControl>
                {typeof element.data.validations.maxLength.value ===
                  'number' && (
                  <FormControl mt={4}>
                    <FormLabel fontSize='sm'>
                      Max length error message
                    </FormLabel>
                    <Input
                      size='sm'
                      fontSize='sm'
                      rounded='md'
                      placeholder='Customize the max length error message'
                      value={element.data.validations.maxLength.errorMessage}
                      onChange={(e) =>
                        builderDispatch(
                          changeElementData<'SHORT_TEXT'>()({
                            id: element.id,
                            data: {
                              validations: {
                                maxLength: {
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
              </>
            ) : (
              <></>
            )}
          </Box>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
