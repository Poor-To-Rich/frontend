import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import DefaultHeader from '@/components/header/DefaultHeader';
import useTransactionParams from '@/hooks/transaction/useTransactionParams';
import { transactionSchema } from '@/schemas/transactionSchema';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import AddTransactionForm from '@/pages/AddTransactionPage/components/AddTransactionForm';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import { useTransactionBack } from '@/hooks/transaction/useTransactionBack';

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

  const handleBackClick = useTransactionBack(methods.getValues('date'));

  return (
    <div className="flex flex-col w-full min-h-screen max-h-fit relative">
      <DefaultHeader leftButton={<LeftArrowButton onClick={handleBackClick} />} label={'가계부 추가'} />
      <PageErrorBoundary>
        <FormProvider {...methods}>
          <AddTransactionForm />
        </FormProvider>
      </PageErrorBoundary>
    </div>
  );
};

export default AddTransactionPage;
