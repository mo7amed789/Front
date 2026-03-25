import { InputHTMLAttributes } from 'react';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export function FormInput({ id, label, error, ...inputProps }: FormInputProps) {
  return (
    <FormField htmlFor={id} label={label} error={error}>
      <Input id={id} error={error} {...inputProps} />
    </FormField>
  );
}
