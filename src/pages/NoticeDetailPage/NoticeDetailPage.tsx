import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate, useParams } from 'react-router-dom';
import NoticeContent from '@/pages/NoticeDetailPage/components/NoticeContent';

const NoticeDetailPage = () => {
  const navigate = useNavigate();
  const { chatroomId, noticeId } = useParams();

  return (
    <div className="w-full min-h-screen flex-col relative">
      <DefaultHeader
        leftButton={
          <LeftArrowButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/notices`, { replace: true })} />
        }
        label="공지 상세보기"
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <NoticeContent chatroomId={chatroomId} noticeId={noticeId} />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default NoticeDetailPage;
