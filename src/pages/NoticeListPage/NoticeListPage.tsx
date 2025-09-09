import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate, useParams } from 'react-router-dom';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import NoticeList from '@/pages/NoticeListPage/components/NoticeList';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const NoticeListPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader
        leftButton={
          <LeftArrowButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/detail`, { replace: true })} />
        }
        label="공지"
        rightButton={
          userRole?.chatroomRole === 'HOST' && (
            <PlusButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/notices/add`, { replace: true })} />
          )
        }
      />
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <NoticeList chatroomId={chatroomId} />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default NoticeListPage;
