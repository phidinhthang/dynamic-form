import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { BuilderCtx } from '../builderReducer';
import { DroppableItem } from '../layout/mainPanel/DroppableItem';
import { SortableItem } from '../layout/mainPanel/SortableItem';
import { EdittableWrapper } from './EditableWrapper';
import { EditBox } from './elements/EditBox';
import { ShortText } from './elements/ShortText/ShortText';
import { EditShortText } from './elements/ShortText/EditShortText';
import { FormDataProvider } from '../formData/FormDataContext';
import { Form } from './elements/Form/Form';

interface GenFormProps {
  mode?: 'preview' | 'edit';
  data: BuilderCtx;
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
        } else {
          const editBox = (
            <EditBox element={element} index={index}>
              {recursiveRenderForm(
                { layout: element.children || [], elements },
                inEditMode
              )}
            </EditBox>
          );
          return inEditMode ? (
            <SortableItem
              accept={['EDIT_BOX', 'SHORT_TEXT']}
              id={element.id}
              parentId={element.parentId}
              type='EDIT_BOX'
              index={index}
              key={element.id}
            >
              <EdittableWrapper element={element}>{editBox}</EdittableWrapper>
            </SortableItem>
          ) : (
            editBox
          );
        }
      })}
    </>
  );
};

export const GenForm: React.FC<GenFormProps> = ({
  data: { elements, layout },
  mode = 'preview',
}) => {
  const inEditMode = mode === 'edit';
  const form = recursiveRenderForm({ layout, elements }, inEditMode);

  return inEditMode ? (
    <Box px={4} w='full'>
      <DroppableItem
        accept={['EDIT_BOX', 'SHORT_TEXT']}
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
        <Form>
          {form}
          <Button type='submit'>Submit form</Button>
        </Form>
      </Box>
    </FormDataProvider>
  );
};
