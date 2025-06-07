import { IncomeExpenseType } from '@/types/transactionTypes';
import { useLocation } from 'react-router-dom';

const useCategoryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const type = queryParams.get('type');
  const categoryType = queryParams.get('categoryType') as IncomeExpenseType;
  const categoryId = queryParams.get('id');
  const isEdit = type === 'edit';

  return {
    categoryType,
    categoryId,
    isEdit,
  };
};

export default useCategoryParams;
