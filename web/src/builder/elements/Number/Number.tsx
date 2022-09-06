import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { changeValue, setTouched } from '../../formData/formDataActions';
import { useFormDataContext } from '../../formData/FormDataContext';
import { ExactFieldData } from '../../formData/formDataReducer';
import { ExactBuilderElement } from '../types';

interface NumberProps {
  element: ExactBuilderElement<'NUMBER'>;
}

export const Number: React.FC<NumberProps> = ({ element }) => {
  const [{ data }, formDataDispatch] = useFormDataContext();

  const { isRequired, max, min } = data[element.id]
    .errors as ExactFieldData<'NUMBER'>['errors'];
  const hasError = isRequired || max || min;
  const validations = element.data.validations;
  const requiredErrMsg = validations.isRequired.errorMessage;
  const minErrMsg = validations.min.errorMessage;
  const maxErrMsg = validations.max.errorMessage;

  const isTouched = data[element.id].isTouched;
  const errorText = isTouched
    ? isRequired
      ? requiredErrMsg
      : min
      ? minErrMsg
      : max
      ? maxErrMsg
      : ''
    : '';

  return (
    <FormControl
      isInvalid={hasError && isTouched}
      isRequired={element.data.validations.isRequired.value}
      py={1}
      px={2}
    >
      <FormLabel htmlFor={element.id} fontSize={18} mb={2} mt={1}>
        {element.data.label}
      </FormLabel>
      <NumberInput
        id={element.id}
        placeholder={element.data.placeholder}
        value={data[element.id].value}
        onChange={(_, value) =>
          formDataDispatch(changeValue(element.id, isNaN(value) ? '' : value))
        }
        onBlur={() => formDataDispatch(setTouched(element.id))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormHelperText my={1}>{element.data.subLabel}</FormHelperText>
      {errorText && <FormErrorMessage my={1}>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};
