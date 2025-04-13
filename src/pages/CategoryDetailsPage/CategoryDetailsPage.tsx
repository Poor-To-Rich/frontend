import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';
import { useEffect } from 'react';
import { useTransactionTypeStore } from '@/stores/useTransactionTypeStore';
import { useReportTypeStore } from '@/stores/useReportTypeStore';
import CategoryLogList from '@/pages/CategoryDetailsPage/components/CategoryLogList ';

const CategoryDetailsPage = () => {
  const location = useLocation();
  const { categoryName, transactionType, reportType } = location.state || {};
  const { setCurrentReportType } = useReportTypeStore();
  const { setCurrentTransactionType } = useTransactionTypeStore();

  useEffect(() => {
    setCurrentReportType(reportType);
    setCurrentTransactionType(transactionType);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label={categoryName} hasBackButton />
      <CategoryOverviewChart reportType={reportType} transactionType={transactionType} />
      <CategoryLogList transactionType={transactionType} />
    </div>
  );
};

export default CategoryDetailsPage;
