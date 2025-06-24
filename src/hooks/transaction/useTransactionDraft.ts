import { useDraftMetaStore } from '@/stores/useDraftMetaStore';
import { useDraftStore } from '@/stores/useDraftStore';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useTransactionDraft = () => {
  const {
    reset,
    formState: { isDirty },
  } = useFormContext<TransactionFormDataType>();
  const { setHasDraftData } = useDraftMetaStore();
  const { shouldSave, enableSave } = useDraftStore();
  const formData = useWatch();
  const [searchParams] = useSearchParams();
  const queryDate = searchParams.get('date');

  useEffect(() => {
    const raw = sessionStorage.getItem('transaction-form-data');
    const parsed = raw ? JSON.parse(raw) : null;
    const sessionDate = parsed?.date;

    if (parsed) {
      if (!queryDate || sessionDate === queryDate) {
        reset(parsed);
      } else {
        sessionStorage.removeItem('transaction-form-data');
        setHasDraftData(false);
      }
    }
  }, [reset, queryDate, setHasDraftData]);

  useEffect(() => {
    if (!shouldSave) {
      setHasDraftData(false);
      return;
    }
    if (isDirty) {
      sessionStorage.setItem('transaction-form-data', JSON.stringify(formData));
      setHasDraftData(true);
    }
  }, [formData, shouldSave, isDirty, setHasDraftData]);

  useEffect(() => {
    enableSave();
  }, [enableSave]);
};

export default useTransactionDraft;
