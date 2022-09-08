import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { BuilderCtx } from '../elements/types';
import { DroppableItem } from '../layout/mainPanel/DroppableItem';
import { SortableItem } from '../layout/mainPanel/SortableItem';
import { EdittableWrapper } from './EditableWrapper';
import { Row } from '../elements/Row/Row';
import { ShortText } from '../elements/ShortText/ShortText';
import { EditShortText } from '../elements/ShortText/EditShortText';
import { FormDataProvider } from '../formData/FormDataContext';
import { Form } from '../elements/Form/Form';
import { SubmitButton } from '../elements/SubmitButton/SubmitButton';
import { EditRow } from '../elements/Row/EditRow';
import { TableRow } from '../table/types';
import { Number } from '../elements/Number/Number';
import { EditNumber } from '../elements/Number/EditNumber';
import { EditSingleChoice } from '../elements/SingleChoice/EditSingleChoice';
import { SingleChoice } from '../elements/SingleChoice/SingleChoice';

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
                accept={[
                  'ROW',
                  'SHORT_TEXT',
                  'SUBMIT_BUTTON',
                  'NUMBER',
                  'SINGLE_CHOICE',
                ]}
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
                accept={[
                  'ROW',
                  'SHORT_TEXT',
                  'SUBMIT_BUTTON',
                  'NUMBER',
                  'SINGLE_CHOICE',
                ]}
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
        } else if (element.type === 'NUMBER') {
          if (inEditMode) {
            return (
              <SortableItem
                accept={[
                  'ROW',
                  'SHORT_TEXT',
                  'SUBMIT_BUTTON',
                  'NUMBER',
                  'SINGLE_CHOICE',
                ]}
                id={element.id}
                parentId={element.parentId}
                index={index}
                key={element.id}
                type='NUMBER'
              >
                <EdittableWrapper element={element}>
                  <EditNumber element={element} />
                </EdittableWrapper>
              </SortableItem>
            );
          }

          return <Number element={element} />;
        } else if (element.type === 'SINGLE_CHOICE') {
          if (inEditMode) {
            return (
              <SortableItem
                accept={[
                  'ROW',
                  'SHORT_TEXT',
                  'SUBMIT_BUTTON',
                  'NUMBER',
                  'SINGLE_CHOICE',
                ]}
                id={element.id}
                parentId={element.parentId}
                index={index}
                key={element.id}
                type='SINGLE_CHOICE'
              >
                <EdittableWrapper element={element}>
                  <EditSingleChoice element={element} />
                </EdittableWrapper>
              </SortableItem>
            );
          }
          return <SingleChoice element={element} />;
        } else if (element.type === 'ROW') {
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
              accept={[
                'ROW',
                'SHORT_TEXT',
                'SUBMIT_BUTTON',
                'NUMBER',
                'SINGLE_CHOICE',
              ]}
              id={element.id}
              parentId={element.parentId}
              type='ROW'
              index={index}
              key={element.id}
            >
              <EdittableWrapper element={element}>
                <EditRow element={element} index={index}>
                  {editBoxChildren}
                </EditRow>
              </EdittableWrapper>
            </SortableItem>
          ) : (
            <Row element={element}>{editBoxChildren}</Row>
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
        accept={[
          'ROW',
          'SHORT_TEXT',
          'SUBMIT_BUTTON',
          'NUMBER',
          'SINGLE_CHOICE',
        ]}
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
