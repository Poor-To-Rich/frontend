import ChatroomDetailHeader from '@/components/header/ChatroomDetailHeader';
import PhotoPreviewBox from '@/pages/ChatroomDetailPage/components/PhotoPreviewBox';
import { useParams } from 'react-router-dom';
import NoticePreviewBox from '@/pages/ChatroomDetailPage/components/NoticePreviewBox';
import RankingPreviewBox from '@/pages/ChatroomDetailPage/components/RankingPreviewBox';

const ChatroomDetailPage = () => {
  const { chatroomId } = useParams();

  return (
    <div className="w-full min-h-screen">
      <ChatroomDetailHeader />
      {chatroomId && (
        <div className="flex flex-col gap-3 px-3">
          <PhotoPreviewBox chatroomId={chatroomId} />
          <NoticePreviewBox chatroomId={chatroomId} />
          <RankingPreviewBox />
        </div>
      )}
    </div>
  );
};

export default ChatroomDetailPage;
