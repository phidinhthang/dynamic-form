import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { deleteElement } from '../builder/builderActions';
import { useBuilderContext } from '../builder/BuilderContext';
import { setInspectElementId } from '../builderPage/builderPageActions';
import { useBuilderPageContext } from '../builderPage/BuilderPageContext';
import { BuilderElement } from '../elements/types';
import { useSetSelectedElement } from '../builderPage/useSetSelectedElement';

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
  const setSelectedElement = useSetSelectedElement();

  return (
    <Box
      border='2px solid'
      borderColor={isEditing && inEditMode ? 'blue.500' : 'transparent'}
      rounded='md'
      style={{ cursor: 'move' }}
      position='relative'
      onMouseDown={(e) => {
        e.stopPropagation();
        setSelectedElement(element.id);
      }}
    >
      {React.cloneElement(children, { inEditMode })}
      {isEditing && (
        <Box
          position='absolute'
          top='50%'
          transform='translateY(-50%)'
          right={-12}
          display='flex'
          flexDir='column'
          gap={1}
          zIndex={100}
        >
          <IconButton
            icon={<SettingsIcon />}
            aria-label='element setting'
            rounded='full'
            onClick={() => {
              builderPageDispatch(setInspectElementId(element.id!));
            }}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label='delete element'
            rounded='full'
            colorScheme='red'
            onClick={() => {
              builderDispatch(deleteElement(element.id));
            }}
          />
        </Box>
      )}
    </Box>
  );
};
