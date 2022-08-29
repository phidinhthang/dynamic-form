import { Box } from '@chakra-ui/react';
import React from 'react';
import { BuilderCtx } from '../builderReducer';
import { DroppableItem } from '../layout/mainPanel/DroppableItem';
import { SortableItem } from '../layout/mainPanel/SortableItem';
import { EdittableWrapper } from './EditableWrapper';
import { EditBox } from './elements/EditBox';
import { ShortText } from './elements/ShortText';

interface GenFormProps {
  mode?: 'preview' | 'edit';
  data: BuilderCtx;
}

const recursiveRenderForm = (
  { layout, elements }: BuilderCtx,
  inEditMode: boolean
) => {
  console.log('in edit mode ', inEditMode);
  return (
    <>
      {layout.map((item, index): React.ReactNode => {
        const element = elements[item];
        if (element.type === 'SHORT_TEXT') {
          if (inEditMode) {
            return (
              <SortableItem
                accept={['EDIT_BOX', 'SHORT_TEXT']}
                id={element.id}
                parentId={element.parentId}
                type='SHORT_TEXT'
                index={index}
                key={element.id}
              >
                <EdittableWrapper element={element}>
                  <ShortText inEditMode={true} element={element} />
                </EdittableWrapper>
              </SortableItem>
            );
          }
          return <ShortText inEditMode={false} element={element} />;
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
            <EdittableWrapper element={element}>{editBox}</EdittableWrapper>
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
        pb={2}
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
    <Box px={4}>{form}</Box>
  );
};
