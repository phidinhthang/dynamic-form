import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ExactBuilderElement } from '../types';
import { changeValue, setTouched } from '../../formData/formDataActions';
import { useFormDataContext } from '../../formData/FormDataContext';

interface ShortTextProps {
  element: ExactBuilderElement<'SHORT_TEXT'>;
}

export const ShortText: React.FC<ShortTextProps> = ({ element }) => {
  const [{ data }, formDataDispatch] = useFormDataContext();

  const { isRequired, maxLength, minLength } = data[element.id].errors;
  const hasError = isRequired || maxLength || minLength;
  const validations = element.data.validations;
  const requiredErrMsg = validations.isRequired.errorMessage;
  const minLengthErrMsg = validations.minLength.errorMessage;
  const maxLengthErrMsg = validations.maxLength.errorMessage;

  const isTouched = data[element.id].isTouched;
  const errorText = isTouched
    ? isRequired
      ? requiredErrMsg
      : minLength
      ? minLengthErrMsg
      : minLength
      ? maxLength
      : maxLengthErrMsg
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
      <Input
        id={element.id}
        placeholder={element.data.placeholder}
        value={data[element.id].value}
        onChange={(e) =>
          formDataDispatch(changeValue(element.id, e.target.value))
        }
        onBlur={() => formDataDispatch(setTouched(element.id))}
      />
      <FormHelperText my={1}>{element.data.subLabel}</FormHelperText>
      {errorText && <FormErrorMessage my={1}>{errorText}</FormErrorMessage>}
    </FormControl>
  );
};
