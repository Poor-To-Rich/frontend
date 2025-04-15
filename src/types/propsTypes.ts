import { UseFormSetError } from 'react-hook-form';
import { SignupData } from '@/types/authTypes';
import { FieldStatusType } from '@/types/authTypes';

export interface CheckVerifyFieldProps {
  setError: UseFormSetError<SignupData>;
  setFieldStatus: React.Dispatch<React.SetStateAction<FieldStatusType>>;
}
