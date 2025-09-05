import HelpTooltipButton from '@/components/button/icon/HelpTooltipButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import RankingInfoModal from '@/components/modal/chat/RankingInfoModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useModal from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import RankingList from '@/pages/RankingListPage/components/RankingList';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const RankingListPage = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label="랭킹"
        rightButton={<HelpTooltipButton onClick={openModal} />}
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <RankingList />
          {isOpen && (
            <ModalDimmed onClose={closeModal}>
              <RankingInfoModal closeModal={closeModal} />
            </ModalDimmed>
          )}
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default RankingListPage;
