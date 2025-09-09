import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate, useParams } from 'react-router-dom';
import ChatroomCoverContainer from '@/pages/ChatroomCoverPage/components/ChatroomCoverContainer';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const ChatroomCoverPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <ChatroomCoverContainer chatroomId={chatroomId} />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default ChatroomCoverPage;
