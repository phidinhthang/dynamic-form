import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
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

interface SingleChoiceInspectorProps {
  element: ExactBuilderElement<'SINGLE_CHOICE'>;
}

export const SingleChoiceInspector: React.FC<SingleChoiceInspectorProps> = ({
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
                onChange={(e) =>
                  builderDispatch(
                    changeElementData<'SINGLE_CHOICE'>()({
                      id: element.id,
                      data: { label: e.target.value },
                    })
                  )
                }
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
                    changeElementData<'SINGLE_CHOICE'>()({
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
                      changeElementData<'SINGLE_CHOICE'>()({
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
          <FormControl>
            <FormLabel>Selected by Default</FormLabel>
            <Select
              placeholder='Select default option'
              onChange={(e) => {
                builderDispatch(
                  changeElementData<'SINGLE_CHOICE'>()({
                    id: element.id,
                    data: {
                      defaultSelectedId: e.target.value
                        ? e.target.value
                        : undefined,
                    },
                  })
                );
              }}
            >
              {element.data.options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
