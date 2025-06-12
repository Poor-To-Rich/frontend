import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';
import { useEffect } from 'react';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import CategoryLogListSection from '@/pages/CategoryDetailsPage/components/Log/CategoryLogListSection';

const CategoryDetailsPage = () => {
  const location = useLocation();
  const { categoryName, transactionType, reportType, categoryId, date, isSavings } = location.state || {};
  const { setCurrentReportType } = useReportTypeStore();
  const { setCurrentTransactionType } = useTransactionReportTypeStore();

  useEffect(() => {
    setCurrentReportType(reportType);
    setCurrentTransactionType(transactionType);
  }, [reportType, transactionType, setCurrentReportType, setCurrentTransactionType]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label={categoryName} hasBackButton />
      <CategoryOverviewChart
        reportType={reportType}
        transactionType={transactionType}
        categoryId={categoryId}
        date={date}
        isSavings={isSavings}
      />
      <CategoryLogListSection
        transactionType={transactionType}
        categoryId={categoryId}
        date={date}
        isSavings={isSavings}
      />
    </div>
  );
};

export default CategoryDetailsPage;
