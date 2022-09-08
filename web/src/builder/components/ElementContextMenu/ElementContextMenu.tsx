import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Menu, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import React from 'react';
import { useOnClickOutside } from '../../../shared-hooks/useOnClickOutside';
import { moveElementDown, moveElementUp } from '../../builder/builderActions';
import { useBuilderContext } from '../../builder/BuilderContext';
import { useElementContextMenuContext } from './ElementContextMenuContext';

export const ElementContextMenu = () => {
  const { contextMenu, setContextMenu } = useElementContextMenuContext();
  const menuContextRef = React.useRef<HTMLDivElement>(null);
  const [, builderDispatch] = useBuilderContext();

  const closeMenu = () => setContextMenu(undefined);

  useOnClickOutside(menuContextRef, () => {
    closeMenu();
  });

  return (
    <Portal>
      <Box
        ref={menuContextRef}
        position='fixed'
        top={contextMenu?.top ?? -99999}
        left={contextMenu?.left ?? -99999}
      >
        <Menu isOpen={!!contextMenu}>
          <MenuList>
            <MenuItem
              icon={<ArrowUpIcon />}
              onClick={() => {
                builderDispatch(moveElementUp(contextMenu!.elementId));
                closeMenu();
              }}
            >
              Move up
            </MenuItem>
            <MenuItem
              icon={<ArrowDownIcon />}
              onClick={() => {
                builderDispatch(moveElementDown(contextMenu!.elementId));
                closeMenu();
              }}
            >
              Move down
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Portal>
  );
};
