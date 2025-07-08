import { IncomeExpenseType } from '@/types/transactionTypes';
import { useLocation } from 'react-router-dom';

const useTransactionParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get('type');
  const transactionDate = queryParams.get('date');
  const transactionMode = queryParams.get('transactionType') as IncomeExpenseType;
  const transactionId = pageType ? queryParams.get('id') : '';

  return {
    transactionDate,
    transactionMode,
    transactionId,
  };
};

export default useTransactionParams;
