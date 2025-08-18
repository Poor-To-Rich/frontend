import ChatroomDetailHeader from '@/components/header/ChatroomDetailHeader';
import PhotoPreviewBox from '@/pages/ChatroomDetailPage/components/PhotoPreviewBox';
import { useParams } from 'react-router-dom';

const ChatroomDetailPage = () => {
  const { chatroomId } = useParams();

  return (
    <div className="w-full min-h-screen">
      <ChatroomDetailHeader />
      {chatroomId && <PhotoPreviewBox chatroomId={chatroomId} />}
    </div>
  );
};

export default ChatroomDetailPage;
