import { TransactionFormDataType } from '@/types/transactionTypes';

const getPayload = (data: TransactionFormDataType) => {
  const isCustom = data.iterationType === 'custom';
  const { customIteration, ...rest } = data;
  return isCustom ? data : rest;
};

export const getFinalData = (data: TransactionFormDataType, isIncome: boolean) => {
  const formData = getPayload(data);

  if (isIncome) {
    const { paymentMethod, ...incomeData } = formData;
    return incomeData;
  }
  return formData;
};
