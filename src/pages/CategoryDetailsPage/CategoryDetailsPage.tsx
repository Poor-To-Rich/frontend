import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';
import CategoryLogListSection from '@/pages/CategoryDetailsPage/components/Log/CategoryLogListSection';

const CategoryDetailsPage = () => {
  const location = useLocation();
  const { categoryName, transactionType, reportType, categoryId, date, isSavings } = location.state || {};

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
