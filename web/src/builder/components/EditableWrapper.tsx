import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { deleteElement } from '../builder/builderActions';
import { useBuilderContext } from '../builder/BuilderContext';
import { setInspectElementId } from '../builderPage/builderPageActions';
import { useBuilderPageContext } from '../builderPage/BuilderPageContext';
import { BuilderElement } from '../elements/types';
import { useSetSelectedElement } from '../builderPage/useSetSelectedElement';
import {
  ElementContextMenuProvider,
  useElementContextMenuContext,
} from './ElementContextMenu/ElementContextMenuContext';
import { ElementContextMenu } from './ElementContextMenu/ElementContextMenu';
import { useEventListener } from '../../shared-hooks/useEventListener';
import { useOnClickOutside } from '../../shared-hooks/useOnClickOutside';

interface EditableWrapperProps {
  children: React.ReactElement;
  element: BuilderElement;
}

const InnerEdittableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  element,
}) => {
  const [{ selectedElementId, inEditMode }, builderPageDispatch] =
    useBuilderPageContext();
  const [, builderDispatch] = useBuilderContext();
  const isEditing = selectedElementId === element.id;
  const setSelectedElement = useSetSelectedElement();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const { setContextMenu } = useElementContextMenuContext();

  useEventListener(
    'contextmenu',
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setContextMenu({
        elementId: element.id,
        left: e.clientX,
        top: e.clientY,
        rightHandSide: false,
      });
      setSelectedElement(element.id);
    },
    elementRef
  );

  return (
    <Box
      ref={elementRef}
      border='2px solid'
      borderColor={isEditing && inEditMode ? 'blue.500' : 'transparent'}
      rounded='md'
      style={{ cursor: 'move' }}
      position='relative'
      onClick={(e) => {
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
      <ElementContextMenu />
    </Box>
  );
};

export const EdittableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  element,
}) => {
  return (
    <ElementContextMenuProvider>
      <InnerEdittableWrapper element={element}>
        {children}
      </InnerEdittableWrapper>
    </ElementContextMenuProvider>
  );
};
