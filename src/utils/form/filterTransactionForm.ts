import { TransactionFormDataType } from '@/types/transactionTypes';
import { filteredData } from '@/utils/form/filteredFormData';
import { omit } from 'lodash';

const getPayload = (data: TransactionFormDataType) => {
  const formData = omit(filteredData(data), 'transactionType');
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
