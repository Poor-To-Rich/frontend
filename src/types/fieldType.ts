import { FieldValues, UseFormSetError } from 'react-hook-form';

export type FieldStatusType = {
  message: string | undefined;
  isVerify: boolean;
};

export interface CheckVerifyFieldProps<T extends FieldValues> {
  setError: UseFormSetError<T>;
  setFieldStatus: (status: FieldStatusType) => void;
  resetFieldStatus: () => void;
}

export type SelectOptionsType = {
  label: string;
  value: string | number;
  visibility?: boolean;
};
