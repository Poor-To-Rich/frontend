import { useEffect } from 'react';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import useTransactionParams from './useTransactionParams';

const useTransactionForm = () => {
  const { setCalenderDate } = useCalenderDateStore();
  const { transactionDate } = useTransactionParams();

  useEffect(() => {
    if (transactionDate) setCalenderDate(new Date(transactionDate));
  }, []);

  return;
};

export default useTransactionForm;
