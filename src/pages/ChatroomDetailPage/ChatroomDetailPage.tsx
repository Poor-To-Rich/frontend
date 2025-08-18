import ChatroomDetailHeader from '@/components/header/ChatroomDetailHeader';
import PhotoPreviewBox from '@/pages/ChatroomDetailPage/components/PhotoPreviewBox';
import { useParams } from 'react-router-dom';
import NoticePreviewBox from '@/pages/ChatroomDetailPage/components/NoticePreviewBox';
import RankingPreviewBox from '@/pages/ChatroomDetailPage/components/RankingPreviewBox';
import ChatMemberBox from '@/pages/ChatroomDetailPage/components/ChatMemberBox';
import ChatActionButton from '@/components/button/ChatActionButton';
import ChatroomProfileBox from '@/pages/ChatroomDetailPage/components/ChatroomProfileBox';

const ChatroomDetailPage = () => {
  const { chatroomId } = useParams();

  return (
    <div className="w-full min-h-screen">
      {chatroomId && (
        <>
          <ChatroomDetailHeader chatroomId={chatroomId} />
          <div className="flex flex-col gap-3 px-5 py-5">
            <ChatroomProfileBox chatroomId={chatroomId} />
            <PhotoPreviewBox chatroomId={chatroomId} />
            <NoticePreviewBox chatroomId={chatroomId} />
            <RankingPreviewBox chatroomId={chatroomId} />
            <ChatMemberBox chatroomId={chatroomId} />
            <div className="w-full mt-3">
              <ChatActionButton label={'채팅방 나가기'} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatroomDetailPage;
