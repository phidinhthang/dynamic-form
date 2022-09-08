import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  Text,
} from '@chakra-ui/react';
import {
  changeData,
  changeValue,
  setSingleChoiceCheckedOptionId,
} from '../../formData/formDataActions';
import { useFormDataContext } from '../../formData/FormDataContext';
import { ExactFieldData } from '../../formData/formDataReducer';
import { ExactBuilderElement } from '../types';
import { SingleChoiceOptionElement } from './interface';

interface SingleChoiceProps {
  element: ExactBuilderElement<'SINGLE_CHOICE'>;
}

export const SingleChoice: React.FC<SingleChoiceProps> = ({ element }) => {
  const [{ data }, formDataDispatch] = useFormDataContext();
  const { isRequired } = data[element.id]
    .errors as ExactFieldData<'SINGLE_CHOICE'>['errors'];
  const field = data[element.id] as ExactFieldData<'SINGLE_CHOICE'>;
  const hasError = isRequired;
  const validations = element.data.validations;
  const requiredErrMsg = validations.isRequired.errorMessage;

  const isTouched = data[element.id].isTouched;
  const errorText = isTouched ? (isRequired ? requiredErrMsg : '') : '';

  return (
    <FormControl
      isInvalid={hasError && isTouched}
      isRequired={element.data.validations.isRequired.value}
      py={3}
      mb={1}
      px={2}
    >
      <FormLabel htmlFor={element.id} fontSize={18} mb={2} mt={1}>
        {element.data.label}
      </FormLabel>
      <Box display='flex' flexDir='column' gap={2}>
        {element.data.options.map((option) => (
          <SingleChoiceOption
            element={option}
            key={option.id}
            isChecked={
              field.checkedId === option.id ||
              (typeof field.defaultCheckedId === 'string' &&
                field.defaultCheckedId === option.id)
            }
            onCheck={() => {
              formDataDispatch(
                changeValue(element.id, option.value ?? (option.label as any))
              );
              formDataDispatch(
                setSingleChoiceCheckedOptionId(element.id, option.id)
              );
            }}
          />
        ))}
      </Box>
      {errorText && <FormErrorMessage my={1}>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};

interface SingleChoiceOptionProps {
  element: SingleChoiceOptionElement;
  isChecked: boolean;
  onCheck: () => void;
}

export const SingleChoiceOption: React.FC<SingleChoiceOptionProps> = ({
  element,
  isChecked,
  onCheck,
}) => {
  return (
    <Box display='inline-flex' alignItems='center' gap={2}>
      <Radio
        size='lg'
        value={element.value ?? element.label}
        isChecked={isChecked}
        onChange={onCheck}
      ></Radio>
      <Text>{element.label}</Text>
    </Box>
  );
};
