import { TransactionFormDataType } from '@/types/transactionTypes';
import isEqual from 'lodash/isEqual';

export const hasIterationChanged = (prev: TransactionFormDataType | undefined, current: TransactionFormDataType) => {
  const prevType = prev?.iterationType;
  const currentType = current.iterationType;

  if (prevType !== currentType) return true;

  if (prevType === 'custom' && currentType === 'custom') {
    return !isEqual(prev?.customIteration, current.customIteration);
  }

  return false;
};
