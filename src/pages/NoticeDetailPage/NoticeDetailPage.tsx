import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import UserProfile from '@/components/profile/UserProfile';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useGetNotice from '@/hooks/apis/notice/useGetNotice';
import { useNavigate, useParams } from 'react-router-dom';

const NoticeDetailPage = () => {
  const navigate = useNavigate();
  const { chatroomId, noticeId } = useParams();
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);
  const { data: noticeDetail } = useGetNotice(chatroomId!, noticeId!);

  return (
    <div className="w-full min-h-screen">
      <DefaultHeader
        leftButton={
          <LeftArrowButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/notices`, { replace: true })} />
        }
        label="공지 상세보기"
      />
      {noticeDetail && userRole && (
        <div className="flex flex-col gap-8 p-8">
          <UserProfile
            chatroomId={chatroomId}
            userProfile={noticeDetail.author}
            noticeId={noticeDetail.noticeId}
            createdAt={noticeDetail.createdAt}
            hasMoreButton={userRole.chatroomRole === 'HOST'}
          />
          <p className="whitespace-pre">{noticeDetail.content}</p>
        </div>
      )}
    </div>
  );
};

export default NoticeDetailPage;
