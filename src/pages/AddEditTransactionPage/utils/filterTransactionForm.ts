import { TransactionFormDataType } from '@/types/transactionTypes';
import { filteredData } from '@/utils/filteredFormData';

const getPayload = (data: TransactionFormDataType) => {
  const formData = filteredData(data);
  const isCustom = formData.iterationType === 'custom';
  const { customIteration, ...rest } = formData;
  return isCustom ? formData : rest;
};

export const getFinalData = (data: TransactionFormDataType, isIncome: boolean) => {
  const formData = getPayload(data);

  if (isIncome) {
    const { paymentMethod, ...incomeData } = formData;
    return incomeData;
  }
  return formData;
};
