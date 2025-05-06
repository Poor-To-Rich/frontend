import { useLocation } from 'react-router-dom';

const useTransactionParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = queryParams.get('type');
  const transactionDate = queryParams.get('date');
  const transactionId = pageType ? queryParams.get('id') : '';
  const isEditPage = pageType === 'edit';

  return {
    transactionDate,
    transactionId,
    isEditPage,
  };
};

export default useTransactionParams;
