import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';
import { useEffect } from 'react';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import CategoryLogList from '@/pages/CategoryDetailsPage/components/CategoryLogList ';

const CategoryDetailsPage = () => {
  const location = useLocation();
  const { categoryName, transactionType, reportType } = location.state || {};
  const { setCurrentReportType } = useReportTypeStore();
  const { setCurrentTransactionType } = useTransactionReportTypeStore();

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
