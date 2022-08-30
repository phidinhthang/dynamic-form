import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Portal,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { changeElementData } from '../../builderActions';
import { useBuilderContext } from '../../BuilderContext';
import { clearInspectElementId } from '../../builderPageActions';
import { useBuilderPageContext } from '../../BuilderPageContext';

interface InspectorProps {
  inspectedElementId?: string;
  closeInspector: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({
  closeInspector,
  inspectedElementId,
}) => {
  const [, builderPageDispatch] = useBuilderPageContext();
  const [{ elements }, builderDispatch] = useBuilderContext();
  React.useEffect(() => {
    if (
      typeof inspectedElementId !== 'undefined' &&
      typeof elements[inspectedElementId] === 'undefined'
    ) {
      builderPageDispatch(clearInspectElementId(undefined));
    }
  }, [inspectedElementId, elements]);

  if (typeof inspectedElementId === 'undefined') return <></>;

  const element = elements[inspectedElementId];
  if (typeof element === 'undefined') return <></>;

  const elementName = element.type === 'SHORT_TEXT' ? 'Short Text' : 'Edit Box';

  return (
    <Portal>
      <Box
        w='480px'
        zIndex={100}
        maxH='100vh'
        bg='cyan.50'
        position='fixed'
        p={4}
        display='flex'
        flexDir='column'
        gap={4}
        top='0'
        right='0'
        bottom='0'
        shadow='md'
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Text as='h2' fontWeight='semibold' fontSize='xl'>
            {elementName}
          </Text>
          <IconButton
            icon={<CloseIcon />}
            aria-label='close inspector'
            onClick={closeInspector}
          />
        </Box>
        <Box maxH='100%' overflowY='auto' overflowX='hidden'>
          <Tabs isFitted>
            <TabList>
              <Tab>General</Tab>
              <Tab>Options</Tab>
              <Tab>Advance</Tab>
            </TabList>
            <TabPanels>
              <TabPanel mx={-1}>
                {element.type !== 'EDIT_BOX' &&
                  element.type !== 'SUBMIT_BUTTON' && (
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
                          <FormLabel fontSize='sm'>
                            Required error message
                          </FormLabel>
                          <Input
                            size='sm'
                            fontSize='sm'
                            rounded='md'
                            placeholder='Customize the required error message'
                            value={
                              element.data.validations.isRequired.errorMessage
                            }
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
                            builderDispatch(
                              changeElementData<'SHORT_TEXT'>()({
                                id: element.id,
                                data: { key: e.target.value },
                              })
                            )
                          }
                        />
                        <FormHelperText>
                          The field can be used to pre-populate fields from URL
                          and to pass data to another form automatically. It is
                          also important that there should be no spaces in
                          between.
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  )}
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
                            value={
                              element.data.validations.minLength.errorMessage
                            }
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
                            value={
                              element.data.validations.maxLength.errorMessage
                            }
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
        </Box>
      </Box>
    </Portal>
  );
};
