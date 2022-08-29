import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { deleteElement } from '../builderActions';
import { useBuilderContext } from '../BuilderContext';
import { setSelectedElementId } from '../builderPageActions';
import { useBuilderPageContext } from '../BuilderPageContext';
import { BuilderElement } from '../builderReducer';

interface EditableWrapperProps {
  children: React.ReactElement;
  element: BuilderElement;
}

export const EdittableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  element,
}) => {
  const [{ selectedElementId, inEditMode }, builderPageDispatch] =
    useBuilderPageContext();
  const [, builderDispatch] = useBuilderContext();
  const isEditing = selectedElementId === element.id;

  return (
    <Box
      border='2px solid'
      borderColor={isEditing && inEditMode ? 'blue.500' : 'transparent'}
      rounded='md'
      style={{ cursor: 'move' }}
      position='relative'
      onMouseDown={(e) => {
        e.stopPropagation();
        builderPageDispatch(setSelectedElementId(element.id));
      }}
    >
      {React.cloneElement(children, { inEditMode })}
      {isEditing && (
        <IconButton
          icon={<DeleteIcon />}
          aria-label='delete element'
          position='absolute'
          top='50%'
          transform='translateY(-50%)'
          right={-12}
          rounded='full'
          colorScheme='red'
          onClick={() => {
            builderDispatch(deleteElement(element.id));
          }}
        />
      )}
    </Box>
  );
};
