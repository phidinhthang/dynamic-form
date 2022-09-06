import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Portal,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { changeElementData } from '../../builder/builderActions';
import { useBuilderContext } from '../../builder/BuilderContext';
import { clearInspectElementId } from '../../builderPage/builderPageActions';
import { useBuilderPageContext } from '../../builderPage/BuilderPageContext';
import { EditBoxInspector } from '../../elements/EditBox/EditBoxInspector';
import { NumberInspector } from '../../elements/Number/NumberInspector';
import { ShortTextInspector } from '../../elements/ShortText/ShortTextInspector';

interface InspectorProps {
  inspectedElementId?: string;
  closeInspector: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({
  closeInspector,
  inspectedElementId,
}) => {
  const [, builderPageDispatch] = useBuilderPageContext();
  const [{ elements }, builderDispatch] = useBuilderContext();
  React.useEffect(() => {
    if (
      typeof inspectedElementId !== 'undefined' &&
      typeof elements[inspectedElementId] === 'undefined'
    ) {
      builderPageDispatch(clearInspectElementId(undefined));
    }
  }, [inspectedElementId, elements]);

  if (typeof inspectedElementId === 'undefined') return <></>;

  const element = elements[inspectedElementId];
  if (typeof element === 'undefined') return <></>;

  const elementName = element.type === 'SHORT_TEXT' ? 'Short Text' : 'Edit Box';

  return (
    <Portal>
      <Box
        w='480px'
        zIndex={100}
        maxH='100vh'
        bg='cyan.50'
        position='fixed'
        p={4}
        display='flex'
        flexDir='column'
        gap={4}
        top='0'
        right='0'
        bottom='0'
        shadow='md'
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Text as='h2' fontWeight='semibold' fontSize='xl'>
            {elementName}
          </Text>
          <IconButton
            icon={<CloseIcon />}
            aria-label='close inspector'
            onClick={closeInspector}
          />
        </Box>
        <Box maxH='100%' overflowY='auto' overflowX='hidden'>
          {element.type === 'SHORT_TEXT' ? (
            <ShortTextInspector element={element} />
          ) : element.type === 'NUMBER' ? (
            <NumberInspector element={element} />
          ) : (
            <EditBoxInspector />
          )}
        </Box>
      </Box>
    </Portal>
  );
};
