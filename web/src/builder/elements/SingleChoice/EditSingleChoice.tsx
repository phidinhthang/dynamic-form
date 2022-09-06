import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Input, Radio, Text } from '@chakra-ui/react';
import React from 'react';
import { usePrevious } from '../../../shared-hooks/usePrevious';
import {
  changeElementData,
  deleteSingleChoiceOption,
  setElementTouched,
  addSingleChoiceOption as addSingleChoiceOptionAction,
  changelSingleChoiceOptionLabel,
} from '../../builder/builderActions';
import { useBuilderContext } from '../../builder/BuilderContext';
import { ExactBuilderElement } from '../types';
import { SingleChoiceOptionElement } from './interface';

interface EditSingleChoiceProps {
  element: ExactBuilderElement<'SINGLE_CHOICE'>;
}

const useGetAddedOptionId = (
  options: SingleChoiceOptionElement[]
): string | undefined => {
  const previousOptions = usePrevious(options);

  if (!previousOptions.current) return;

  if (options.length - previousOptions.current.length === 1) {
    return options.at(-1)?.id;
  }
};

export const EditSingleChoice: React.FC<EditSingleChoiceProps> = ({
  element,
}) => {
  const [, builderDispatch] = useBuilderContext();
  const setTouched = () => {
    builderDispatch(setElementTouched(element.id));
  };
  const options = element.data.options;
  const addedOptionId = useGetAddedOptionId(options);
  const addSingleChoiceOption = () => {
    setTimeout(() => {
      builderDispatch(addSingleChoiceOptionAction(element.id));
    }, 0);
  };

  return (
    <Box py={1} px={2}>
      <Input
        onChange={(e) => {
          builderDispatch(
            changeElementData<'SINGLE_CHOICE'>()({
              id: element.id,
              data: { label: e.target.value },
            })
          );
        }}
        onBlur={setTouched}
        value={element.data.label}
        variant='unstyled'
        flexGrow={1}
        placeholder='Type a label'
        mt={2}
        mb={3}
        size='md'
        fontSize={18}
        fontWeight='medium'
        _placeholder={{ color: 'gray.500', fontWeight: 'normal' }}
      />
      <Box display='flex' flexDir='column' gap={2}>
        {options.map((option) => (
          <EditSingleChoiceOption
            element={option}
            key={option.id}
            parentId={element.id}
            autoFocus={option.id === addedOptionId}
            defaultChecked={option.id === element.data.defaultSelectedId}
          />
        ))}
      </Box>
      <Button
        size='sm'
        variant='ghost'
        mt={2}
        colorScheme='teal'
        onMouseDown={addSingleChoiceOption}
      >
        <Text as='span' textDecoration='underline'>
          Add option
        </Text>
      </Button>
    </Box>
  );
};

interface EditSingleChoiceOptionProps {
  element: SingleChoiceOptionElement;
  parentId: string;
  autoFocus?: boolean;
  defaultChecked?: boolean;
}

const EditSingleChoiceOption: React.FC<EditSingleChoiceOptionProps> = ({
  element,
  parentId,
  autoFocus,
  defaultChecked,
}) => {
  const [, builderDispatch] = useBuilderContext();
  const [isHover, setHover] = React.useState(false);
  const [isFocus, setFocus] = React.useState(false);
  const showDeleteOptionButton = isHover || isFocus;

  const deleteOption = () =>
    builderDispatch(deleteSingleChoiceOption(parentId, element.id));

  return (
    <Box
      display='inline-flex'
      alignItems='center'
      gap={2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Radio
        size='lg'
        value={element.value ?? element.label}
        disabled={true}
        isChecked={defaultChecked}
      />
      <Box display='inline-block' position='relative'>
        <Input
          size='md'
          value={element.label}
          autoFocus={autoFocus}
          variant='unstyled'
          display='inline-block'
          placeholder='Type an option'
          w='fit-content'
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            if (element.label === '') {
              deleteOption();
            }
            setFocus(false);
          }}
          onChange={(e) =>
            builderDispatch(
              changelSingleChoiceOptionLabel({
                elementId: parentId,
                optionId: element.id,
                label: e.target.value,
              })
            )
          }
        />
        {showDeleteOptionButton && (
          <IconButton
            icon={<CloseIcon boxSize={2} />}
            aria-label='delete option'
            isRound
            size='xs'
            position='absolute'
            top='50%'
            right='4'
            transform='translateY(-50%)'
            onClick={() => {
              deleteOption();
            }}
          />
        )}
      </Box>
    </Box>
  );
};
