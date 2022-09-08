import React from 'react';
import { createContext } from '../../../utils/createContext';

interface ContextMenuCtx {
  top: number;
  left: number;
  rightHandSide?: boolean;
  elementId: string;
}

const [Provider, useElementContextMenuContext] = createContext<{
  contextMenu: ContextMenuCtx | undefined;
  setContextMenu: React.Dispatch<
    React.SetStateAction<ContextMenuCtx | undefined>
  >;
}>({
  contextMenu: undefined,
  setContextMenu: () => {},
});

const ElementContextMenuProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [contextMenu, setContextMenu] = React.useState<
    ContextMenuCtx | undefined
  >(undefined);

  return (
    <Provider value={{ contextMenu, setContextMenu }}>{children}</Provider>
  );
};

export { useElementContextMenuContext, ElementContextMenuProvider };
