import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import { changeElementData } from '../builder/builderActions';
import { useBuilderContext } from '../builder/BuilderContext';
import { ExactBuilderElement } from '../builder/builderReducer';

interface ShortTextProps {
  inEditMode?: boolean;
  element: ExactBuilderElement<'SHORT_TEXT'>;
}

export const ShortText: React.FC<ShortTextProps> = ({
  inEditMode,
  element,
}) => {
  const [, builderDispatch] = useBuilderContext();

  const Label = inEditMode ? (
    <Box display='flex' alignItems='center'>
      <Input
        onChange={(e) => {
          builderDispatch(
            changeElementData<'SHORT_TEXT'>()({
              id: element.id,
              data: { label: e.target.value },
            })
          );
        }}
        value={element.data.label}
        variant='unstyled'
        flexGrow={1}
        placeholder='Type a question'
        display='inline-block'
        my={2}
        size='md'
        fontSize={18}
        fontWeight='medium'
        _placeholder={{ color: 'gray.500', fontWeight: 'normal' }}
      />
      {element.data.validations.isRequired.value && (
        <Box as='span' color='red.500' fontSize='2xl' fontWeight='semibold'>
          *
        </Box>
      )}
    </Box>
  ) : (
    <Box
      as='label'
      display='inline-block'
      fontSize={18}
      fontWeight='medium'
      my={2}
    >
      {element.data.label}
      {element.data.validations.isRequired.value && (
        <Box
          as='span'
          ml={1}
          color='red.500'
          fontWeight='semibold'
          fontSize='lg'
        >
          *
        </Box>
      )}
    </Box>
  );
  const TextInput = inEditMode ? (
    <Input
      pointerEvents='none'
      placeholder={element.data.placeholder}
      defaultValue={element.data.defaultValue}
      tabIndex={-1}
    />
  ) : (
    <Input
      placeholder={element.data.placeholder}
      defaultValue={element.data.defaultValue}
    />
  );
  const SubLabel = inEditMode ? (
    <Input
      value={element.data.subLabel}
      variant='unstyled'
      placeholder='Type a sublabel'
      my={1}
      onChange={(e) => {
        builderDispatch(
          changeElementData<'SHORT_TEXT'>()({
            id: element.id,
            data: { subLabel: e.target.value },
          })
        );
      }}
      fontSize='sm'
      _placeholder={{ color: 'gray.400' }}
    />
  ) : (
    <Box as='span' my={1} fontSize='sm' color='gray.600'>
      {element.data.subLabel}
    </Box>
  );
  return (
    <Box
      py={1}
      px={2}
      onClick={() => {
        if (inEditMode) {
        }
      }}
    >
      {Label}
      {TextInput}
      {SubLabel}
    </Box>
  );
};
