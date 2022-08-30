import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import { changeElementData } from '../../../builderActions';
import { useBuilderContext } from '../../../BuilderContext';
import { ExactBuilderElement } from '../../../builderReducer';

interface EditShortTextProps {
  element: ExactBuilderElement<'SHORT_TEXT'>;
}

export const EditShortText: React.FC<EditShortTextProps> = ({ element }) => {
  const [, builderDispatch] = useBuilderContext();

  return (
    <Box py={1} px={2}>
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
          placeholder='Type a label'
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
      <Input
        pointerEvents='none'
        placeholder={element.data.placeholder}
        defaultValue={element.data.defaultValue}
        tabIndex={-1}
      />
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
    </Box>
  );
};
