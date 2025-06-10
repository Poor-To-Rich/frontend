import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation } from 'react-router-dom';
import IterationDataListSection from '@/pages/IterationDataPage/components/IterationDataListSection';
import { IncomeExpenseType } from '@/types/transactionTypes';

const IterationDataPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || '지출';

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label={`반복 ${type} 데이터`} hasBackButton />
      <IterationDataListSection type={type as IncomeExpenseType} />
    </div>
  );
};

export default IterationDataPage;
