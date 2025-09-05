import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate } from 'react-router-dom';
import HostedChatroomList from '@/pages/HostedChatroomsPage/components/HostedChatroomList';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const HostedChatroomsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label="나의 채팅방"
        rightButton={<PlusButton onClick={() => navigate('/chat/chatroom/add')} />}
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <HostedChatroomList />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default HostedChatroomsPage;
