import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import DefaultHeader from '@/components/header/DefaultHeader';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { transactionSchema } from '@/schemas/transactionSchema';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AddTransactionForm from '@/pages/AddTransactionPage/components/AddTransactionForm';

const AddTransactionPage = () => {
  const { transactionDate } = useTransactionParams();
  const methods = useForm<TransactionFormDataType>({
    defaultValues: {
      cost: 0,
      memo: '',
      date: transactionDate!,
      transactionType: '지출',
      iterationType: 'none',
    },
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
  });
  const dateRef = useRef(methods.getValues('date'));
  const { setCalenderDate } = useCalenderDateStore();

  const resetCalenderDate = () => {
    setCalenderDate(new Date(dateRef.current));
  };

  return (
    <div className="flex flex-col w-full min-h-screen max-h-fit relative">
      <DefaultHeader label={'가계부 추가'} hasBackButton resetCalenderDate={resetCalenderDate} />
      <PageErrorBoundary>
        <FormProvider {...methods}>
          <AddTransactionForm />
        </FormProvider>
      </PageErrorBoundary>
    </div>
  );
};

export default AddTransactionPage;
