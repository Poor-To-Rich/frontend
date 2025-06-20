import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import DefaultHeader from '@/components/header/DefaultHeader';
import WeeklyDetailsSection from '@/pages/WeeklyDetailsPage/components/WeeklyDetailsSection';

const WeeklyDetailsPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label="주별 상세내역" hasBackButton />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <WeeklyDetailsSection />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default WeeklyDetailsPage;
