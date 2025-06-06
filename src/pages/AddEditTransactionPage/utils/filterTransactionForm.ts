import { TransactionFormDataType } from '@/types/transactionTypes';
import { filteredData } from '@/utils/filteredFormData';
import { omit } from 'lodash';

const getPayload = (data: TransactionFormDataType) => {
  const formData = filteredData(data);
  const isCustom = formData.iterationType === 'custom';
  const notCustomExcludeData = omit(formData, ['customIteration']);
  return isCustom ? formData : notCustomExcludeData;
};

export const getFinalData = (data: TransactionFormDataType, isIncome: boolean) => {
  const formData = getPayload(data);

  if (isIncome) {
    const incomeData = omit(formData, ['paymentMethod']);
    return incomeData;
  }

  return formData;
};
