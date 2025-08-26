import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import TapBar from '@/components/tapbar/TapBar';
import DailyTransactionList from '@/pages/MainPage/components/daily/DailyTransactionList';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import MonthlyContainer from '@/pages/MainPage/components/MonthlyContainer';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import { useEffect } from 'react';
import useModal from '@/hooks/useModal';
import PWAInstallModal from '@/components/modal/pwa/PWAInstallModal';
import PhotoDetailModal from '@/components/modal/photo/PhotoDetailModal';

const MainPage = () => {
  const { mainHeaderDate, setMainHeaderDate } = useHeaderDateStore();
  const { isOpen, openModal, closeModal } = useModal();

  const handleClose = () => {
    closeModal();
    localStorage.setItem('hasVisited', 'true');
  };

  useEffect(() => {
    const hasVisited = Boolean(localStorage.getItem('hasVisited'));
    if (!hasVisited) {
      openModal();
    }
  }, [openModal]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DateControlHeader headerDate={mainHeaderDate} setHeaderDate={setMainHeaderDate} />
      <div className="flex flex-col grow ">
        <PageErrorBoundary>
          <MonthlyContainer />
          <DailyTransactionList />
          <PlusCircleButton />
        </PageErrorBoundary>
      </div>
      <TapBar page="main" />
      <PhotoDetailModal chatroomId="7" photoId={101} />
      {isOpen && <PWAInstallModal closeModal={handleClose} />}
    </div>
  );
};

export default MainPage;
