import LoadingSpinner from '@/components/loading/LoadingSpinner';
import UserProfile from '@/components/profile/UserProfile';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';
import useGetNotice from '@/hooks/apis/notice/useGetNotice';

interface Props {
  chatroomId?: string;
  noticeId?: string;
}

const NoticeContent = ({ chatroomId, noticeId }: Props) => {
  const { data: userRole } = useGetChatroomUserRole(chatroomId!);
  const { data: noticeDetail, isPending } = useGetNotice(chatroomId!, noticeId!);

  if (isPending) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

export default NoticeContent;
