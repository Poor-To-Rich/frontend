import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDraftMetaStore } from '@/stores/useDraftMetaStore';
import { useDraftStore } from '@/stores/useDraftStore';
import { TransactionFormDataType } from '@/types/transactionTypes';

const useTransactionDraft = () => {
  const {
    reset,
    formState: { isDirty },
  } = useFormContext<TransactionFormDataType>();

  const formData = useWatch();
  const { shouldSave, enableSave } = useDraftStore();
  const { hasDraftData, setHasDraftData } = useDraftMetaStore();

  // 최초에 draft를 불러올 때는 reset만
  useEffect(() => {
    const raw = sessionStorage.getItem('transaction-form-data');
    if (!raw) return;

    const parsed: TransactionFormDataType = JSON.parse(raw);
    if (!parsed) return;

    reset(parsed);
    setHasDraftData(true);
  }, [reset, setHasDraftData]);

  // 변경사항 draft 저장
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

  // 저장 가능 상태 활성화
  useEffect(() => {
    enableSave();
  }, [enableSave]);

  return { hasDraftData };
};

export default useTransactionDraft;
