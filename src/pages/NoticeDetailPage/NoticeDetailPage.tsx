import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import UserProfile from '@/components/profile/UserProfile';
import useGetNotice from '@/hooks/apis/notice/useGetNotice';
import { useNavigate, useParams } from 'react-router-dom';

const NoticeDetailPage = () => {
  const navigate = useNavigate();
  const { chatroomId, noticeId } = useParams();
  //   const { data: noticeDetail } = useGetNotice(chatroomId!, noticeId!);

  const noticeDetail = {
    noticeId: 1,
    content: `"[ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요.", \n [ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요.`,
    createdAt: '2025-07-01T15:14:00Z',
    author: {
      userId: 12,
      profileImage: 'https://example.com/profiles/user-555.jpg',
      nickname: '데굴',
      isHost: true,
      rankingType: 'NONE',
    },
  };

  return (
    <div className="w-full min-h-screen">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="공지 상세보기" />
      {noticeDetail && (
        <div className="flex flex-col gap-8 p-8">
          <UserProfile
            chatroomId={chatroomId}
            userProfile={noticeDetail.author}
            noticeId={noticeDetail.noticeId}
            createdAt={noticeDetail.createdAt}
          />
          <p className="whitespace-pre">{noticeDetail.content}</p>
        </div>
      )}
    </div>
  );
};

export default NoticeDetailPage;
