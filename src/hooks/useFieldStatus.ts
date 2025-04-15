import { FieldStatusType } from '@/types/authTypes';
import { useState } from 'react';

export const useFieldStatus = () => {
  const defaultStatus = { message: undefined, isVerify: false };
  const [status, setStatus] = useState<FieldStatusType>(defaultStatus);

  const resetStatus = () => {
    setStatus(defaultStatus);
  };

  return { status, setStatus, resetStatus };
};
