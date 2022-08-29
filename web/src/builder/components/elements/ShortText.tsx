import { Box, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { changeElementData } from '../../builderActions';
import { useBuilderContext } from '../../BuilderContext';
import { useBuilderPageContext } from '../../BuilderPageContext';
import { BuilderElement, ExactBuilderElement } from '../../builderReducer';

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
      placeholder='Type a question'
      my={2}
      size='md'
      fontSize={18}
      fontWeight='medium'
      _placeholder={{ color: 'gray.500', fontWeight: 'normal' }}
    />
  ) : (
    <Box
      as='label'
      display='inline-block'
      fontSize={18}
      fontWeight='medium'
      my={2}
    >
      {element.data.label}
    </Box>
  );
  const TextInput = inEditMode ? <Input pointerEvents='none' /> : <Input />;
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
