import DefaultHeader from '@/components/header/DefaultHeader';
import { useLocation } from 'react-router-dom';
import CategoryOverviewChart from '@/pages/CategoryDetailsPage/components/CategoryOverviewChart';
import CategoryLogListSection from '@/pages/CategoryDetailsPage/components/Log/CategoryLogListSection';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const CategoryDetailsPage = () => {
  const location = useLocation();
  const { categoryName, transactionType, reportType, categoryId, date, isSavings } = location.state || {};
  const isWeekly = reportType === '월별';

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label={categoryName} hasBackButton />
      <PageErrorBoundary>
        <FetchErrorBoundary key={`${date}-${categoryId}-${isWeekly}`}>
          <CategoryOverviewChart
            transactionType={transactionType}
            categoryId={categoryId}
            date={date}
            isWeekly={isWeekly}
            isSavings={isSavings}
          />
          <CategoryLogListSection
            transactionType={transactionType}
            categoryId={categoryId}
            date={date}
            isSavings={isSavings}
          />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default CategoryDetailsPage;
