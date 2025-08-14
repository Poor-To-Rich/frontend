import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import DefaultHeader from '@/components/header/DefaultHeader';
import WeeklyDetailsSection from '@/pages/WeeklyDetailsPage/components/WeeklyDetailsSection';
import { useNavigate } from 'react-router-dom';

const WeeklyDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label="주별 상세내역" leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <WeeklyDetailsSection />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default WeeklyDetailsPage;
