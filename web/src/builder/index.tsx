import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Text,
  ToastId,
  useToast,
} from '@chakra-ui/react';
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';
import { XYCoord, Identifier } from 'dnd-core';
import { nanoid } from 'nanoid';
import autoAnimate from '@formkit/auto-animate';
import { useBuilderContext } from './BuilderContext';
import React from 'react';
import produce from 'immer';
import { SidebarItem } from './layout/sidebar/SidebarItem';
import { DroppableItem } from './layout/mainPanel/DroppableItem';
import { SortableItem } from './layout/mainPanel/SortableItem';
import { ShortText } from './components/elements/ShortText';
import { EdittableWrapper } from './components/EditableWrapper';
import { GenForm } from './components/GenForm';
import { useBuilderPageContext } from './BuilderPageContext';
import { useHotkeys } from 'react-hotkeys-hook';
import { Sidebar } from './layout/sidebar/Sidebar';
import { MainPanel } from './layout/mainPanel/MainPanel';
import { HashTagIcon } from '../icons/HashTagIcon';
import { TextIcon } from '../icons/TextIcon';
import { BoxIcon } from '../icons/BoxIcon';
import { Inspector } from './layout/inspector/Inspector';
import {
  clearInspectElementId,
  toggleFormPreviewMode,
} from './builderPageActions';
import { SaveIcon } from '../icons/SaveIcon';
import { group } from '../utils/group';
import { BaseBuilderElement, ShortTextElement } from './builderReducer';
import { listify } from '../utils/listify';
import { InfoIcon } from '@chakra-ui/icons';
import { intersperse } from '../utils/intersperse';
import { sleep } from '../utils/sleep';
import { PressIcon } from '../icons/PressIcon';

export const BuilderPage = () => {
  const [{ layout, elements }] = useBuilderContext();
  const toastIdsRef = React.useRef<ToastId[]>([]);
  const [
    { inspectedElementId, inEditMode, isSidebarOpen },
    builderPageDispatch,
  ] = useBuilderPageContext();
  const [, builderDispatch] = useBuilderContext();
  const toast = useToast();
  useHotkeys('ctrl+z', () => {
    builderDispatch({ type: 'UNDO_CHANGES', payload: undefined });
  });

  useHotkeys('ctrl+shift+z', () => {
    builderDispatch({ type: 'REDO_CHANGES', payload: undefined });
  });

  React.useEffect(() => {
    if (inEditMode) {
      toastIdsRef.current.forEach((id) => {
        toast.close(id);
      });
      toastIdsRef.current = [];
      return;
    }

    Object.values(elements)
      .filter((e: any) => !e.data.key && e.type !== 'EDIT_BOX')
      // @ts-ignore
      .forEach((item: BaseBuilderElement & ShortTextElement) => {
        let toastContent: React.ReactNode = <></>;
        if (item.data.label) {
          toastContent = (
            <Text as='span'>
              item with label{' '}
              <Text bg='red.600' as='span' px='2px' rounded='sm'>
                {item.data.label}
              </Text>{' '}
              has an empty key
            </Text>
          );
        } else {
          toastContent = (
            <Text as='span'>
              item with id{' '}
              <Text bg='red.600' as='span' px='2px' rounded='sm'>
                {item.id}
              </Text>{' '}
              has an empty key
            </Text>
          );
        }

        toastIdsRef.current.push(
          toast({
            position: 'top-right',
            duration: 3000,
            render: () => (
              <Box
                color='white'
                display='flex'
                w={360}
                alignItems='center'
                gap={3}
                px={4}
                py={3}
                bg='red.500'
                rounded='md'
                fontSize='sm'
              >
                <InfoIcon w={6} h={6} />
                {toastContent}
              </Box>
            ),
          })
        );
      });

    listify(
      group(
        Object.values(elements)
          .filter((element) => element.type !== 'EDIT_BOX')
          .filter((element) => !!(element.data as any).key),
        (element: any) => element.data.key
      ),
      (_, value) => value
    )
      .filter((arr) => arr.length > 1)
      .forEach((arr) => {
        const aliases = intersperse(
          arr.map((item: any) => {
            if (item.data.label) {
              return (
                <Text as='span'>
                  label{' '}
                  <Text bg='red.600' as='span' px='2px' rounded='sm'>
                    {item.data.label}
                  </Text>
                </Text>
              );
            }
            return (
              <Text as='span'>
                id{' '}
                <Text bg='red.600' as='span' px='2px' rounded='sm'>
                  {item.id}
                </Text>
              </Text>
            );
          }),
          <Text as='span'>, </Text>
        );

        toastIdsRef.current.push(
          toast({
            position: 'top-right',
            duration: 3000,
            render: () => (
              <Box
                color='white'
                display='flex'
                w={360}
                alignItems='center'
                gap={3}
                px={4}
                py={3}
                bg='red.500'
                fontSize='sm'
                rounded='md'
              >
                <InfoIcon w={6} h={6} />
                <Text>
                  item with {aliases} has the same key{' '}
                  <Text as='span' bg='red.600' px='2px'>
                    {(arr[0].data as any).key}
                  </Text>
                </Text>
              </Box>
            ),
          })
        );
      });
  }, [inEditMode]);

  return (
    <Box>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        openSidebar={() => {
          builderPageDispatch({ type: 'OPEN_SIDEBAR', payload: undefined });
        }}
        closeSidebar={() => {
          builderPageDispatch({ type: 'CLOSE_SIDEBAR', payload: undefined });
        }}
      >
        <SidebarItem
          icon={<BoxIcon width={30} height={30} />}
          elementType='EDIT_BOX'
        >
          Edit Box
        </SidebarItem>
        <SidebarItem
          icon={<TextIcon width={30} height={30} />}
          elementType='SHORT_TEXT'
        >
          Short Text
        </SidebarItem>
        <SidebarItem
          icon={<PressIcon width={30} height={30} />}
          elementType='SUBMIT_BUTTON'
        >
          Submit Button
        </SidebarItem>
      </Sidebar>

      <MainPanel isSidebarOpen={isSidebarOpen}>
        <Box
          display='flex'
          gap={8}
          justifyContent='center'
          alignItems='center'
          mb={5}
          pt={5}
        >
          <Button
            onClick={() =>
              console.log("lay out '", layout, 'elements ', elements)
            }
            leftIcon={<SaveIcon width={24} height={24} />}
          >
            Save
          </Button>
          <FormControl
            display='inline-flex'
            w='fit-content'
            alignItems='center'
          >
            <FormLabel htmlFor='form-preview-toggler' mb='0'>
              Preview mode:
            </FormLabel>
            <Switch
              id='form-preview-toggler'
              size='lg'
              isChecked={!inEditMode}
              onChange={() =>
                builderPageDispatch(toggleFormPreviewMode(undefined))
              }
            />
          </FormControl>
        </Box>
        <Box rounded='md' shadow='sm' bg='white' w='full' maxW={800} mx='auto'>
          <GenForm
            data={{ elements, layout }}
            mode={inEditMode ? 'edit' : 'preview'}
          />
        </Box>
      </MainPanel>

      <Inspector
        inspectedElementId={inspectedElementId}
        closeInspector={() => {
          builderPageDispatch(clearInspectElementId(undefined));
        }}
      ></Inspector>
    </Box>
  );
};
