import { Box, Input, Text } from '@chakra-ui/react';
import {
  changeElementData,
  setElementTouched,
} from '../../builder/builderActions';
import { useBuilderContext } from '../../builder/BuilderContext';
import { ExactBuilderElement } from '../types';

interface EditNumberProps {
  element: ExactBuilderElement<'NUMBER'>;
}

export const EditNumber: React.FC<EditNumberProps> = ({ element }) => {
  const [, builderDispatch] = useBuilderContext();
  const setTouched = () => builderDispatch(setElementTouched(element.id));

  return (
    <Box py={1} px={2}>
      <Box display='flex' alignItems='center'>
        <Input
          onChange={(e) => {
            builderDispatch(
              changeElementData<'NUMBER'>()({
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
      {element.isTouched && (
        <Box display='flex' flexDir='column' gap={1}>
          {element.buildErrors?.map((error) => (
            <Text as='span' fontSize='sm' color='red.500' key={error.errorKey}>
              {error.message}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
