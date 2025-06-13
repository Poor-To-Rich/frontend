import DefaultHeader from '@/components/header/DefaultHeader';
import WeeklyDetailsSection from '@/pages/WeeklyDetailsPage/components/WeeklyDetailsSection';

const WeeklyDetailsPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label="주별 상세내역" hasBackButton />
      <WeeklyDetailsSection />
    </div>
  );
};

export default WeeklyDetailsPage;
