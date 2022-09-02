import { Form } from '../forms/types';

export type UpdateFormBody = Partial<
  Omit<Form, 'id' | 'createdAt' | 'updatedAt'>
>;
