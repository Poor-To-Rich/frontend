import { UseFormSetError } from 'react-hook-form';
import { SignupFormType } from '@/types/authTypes';

export type FieldStatusType = {
  message: string | undefined;
  isVerify: boolean;
};

export interface CheckVerifyFieldProps {
  setError: UseFormSetError<SignupFormType>;
  setFieldStatus: (status: FieldStatusType) => void;
}

export type VerifyButtonType = '인증' | '재발급' | '확인' | '중복확인';

export type SelectOptionsType = {
  label: string;
  value: string;
};
