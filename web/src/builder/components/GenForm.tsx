import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { BuilderCtx } from '../elements/types';
import { DroppableItem } from '../layout/mainPanel/DroppableItem';
import { SortableItem } from '../layout/mainPanel/SortableItem';
import { EdittableWrapper } from './EditableWrapper';
import { EditBox } from '../elements/EditBox/EditBox';
import { ShortText } from '../elements/ShortText/ShortText';
import { EditShortText } from '../elements/ShortText/EditShortText';
import { FormDataProvider } from '../formData/FormDataContext';
import { Form } from '../elements/Form/Form';
import { SubmitButton } from '../elements/SubmitButton/SubmitButton';
import { EditEditBox } from '../elements/EditBox/EditEditBox';
import { TableRow } from '../table/types';

interface GenFormProps {
  mode?: 'preview' | 'edit';
  data: BuilderCtx;
  onSubmit?: (row: TableRow) => void;
}

const recursiveRenderForm = (
  { layout, elements }: BuilderCtx,
  inEditMode: boolean
) => {
  return (
    <>
      {layout.map((item, index): React.ReactNode => {
        const element = elements[item];
        if (element.type === 'SHORT_TEXT') {
          if (inEditMode) {
            return (
              <SortableItem
                accept={['EDIT_BOX', 'SHORT_TEXT', 'SUBMIT_BUTTON']}
                id={element.id}
                parentId={element.parentId}
                type='SHORT_TEXT'
                index={index}
                key={element.id}
              >
                <EdittableWrapper element={element}>
                  <EditShortText element={element} />
                </EdittableWrapper>
              </SortableItem>
            );
          }
          return <ShortText element={element} />;
        } else if (element.type === 'SUBMIT_BUTTON') {
          if (inEditMode) {
            return (
              <SortableItem
                accept={['EDIT_BOX', 'SHORT_TEXT', 'SUBMIT_BUTTON']}
                id={element.id}
                parentId={element.parentId}
                index={index}
                key={element.id}
                type='SUBMIT_BUTTON'
              >
                <EdittableWrapper element={element}>
                  <SubmitButton />
                </EdittableWrapper>
              </SortableItem>
            );
          } else {
            return <SubmitButton />;
          }
        }
        {
          const editBoxChildren = (
            <>
              {recursiveRenderForm(
                { layout: element.children || [], elements },
                inEditMode
              )}
            </>
          );
          return inEditMode ? (
            <SortableItem
              accept={['EDIT_BOX', 'SHORT_TEXT', 'SUBMIT_BUTTON']}
              id={element.id}
              parentId={element.parentId}
              type='EDIT_BOX'
              index={index}
              key={element.id}
            >
              <EdittableWrapper element={element}>
                <EditEditBox element={element} index={index}>
                  {editBoxChildren}
                </EditEditBox>
              </EdittableWrapper>
            </SortableItem>
          ) : (
            <EditBox element={element}>{editBoxChildren}</EditBox>
          );
        }
      })}
    </>
  );
};

export const GenForm: React.FC<GenFormProps> = ({
  data: { elements, layout },
  mode = 'preview',
  onSubmit,
}) => {
  const inEditMode = mode === 'edit';
  const form = recursiveRenderForm({ layout, elements }, inEditMode);

  return inEditMode ? (
    <Box px={4} w='full'>
      <DroppableItem
        accept={['EDIT_BOX', 'SHORT_TEXT', 'SUBMIT_BUTTON']}
        id='root'
        w='full'
        h='full'
        py={2}
        renderOnActive={(isActive) => (
          <Box
            w='full'
            h={10}
            display='flex'
            alignItems='center'
            justifyContent='center'
            border='1px dashed'
            borderColor={'gray.500'}
          >
            {isActive && 'Drop here!'}
          </Box>
        )}
      >
        {form}
      </DroppableItem>
    </Box>
  ) : (
    <FormDataProvider value={{ elements, layout }}>
      <Box px={4} py={4}>
        <Form onSubmit={onSubmit}>{form}</Form>
      </Box>
    </FormDataProvider>
  );
};
