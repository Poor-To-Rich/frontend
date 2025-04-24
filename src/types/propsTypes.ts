import { UseFormSetError } from 'react-hook-form';
import { SignupFormType } from '@/types/authTypes';
import { FieldStatusType } from '@/types/authTypes';

export interface CheckVerifyFieldProps {
  setError: UseFormSetError<SignupFormType>;
  setFieldStatus: React.Dispatch<React.SetStateAction<FieldStatusType>>;
}
