import { useDraftStore } from '@/stores/useDreftStore';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useTransactionDraft = () => {
  const { watch, reset } = useFormContext<TransactionFormDataType>();
  const { shouldSave, enableSave } = useDraftStore();
  const formData = watch();

  useEffect(() => {
    const raw = sessionStorage.getItem('transaction-form-data');
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed) reset(parsed);
  }, [reset]);

  useEffect(() => {
    if (!shouldSave) return;
    sessionStorage.setItem('transaction-form-data', JSON.stringify(formData));
  }, [formData, shouldSave]);

  useEffect(() => {
    return () => {
      enableSave();
    };
  }, []);
};

export default useTransactionDraft;
