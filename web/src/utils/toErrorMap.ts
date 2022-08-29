import { Error } from './types/Error';
import objectPath from 'object-path';

export const toErrorMap = <
  T extends Record<string, unknown> = Record<string, string>
>(
  errors: Error[]
): T => {
  const errorMap: T = {} as any;

  errors.forEach((error) => {
    objectPath.set(errorMap, error.path, error.message);
  });

  return errorMap;
};
