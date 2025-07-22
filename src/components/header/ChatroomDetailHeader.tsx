import { useNavigate } from 'react-router-dom';
import DefaultHeader from '@/components/header/DefaultHeader';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import LikeButton from '@/components/button/icon/LikeButton';
import ShareButton from '@/components/button/icon/ShareButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';

const ChatroomDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      rightButton={
        <div className="h-full flex items-center gap-3 mr-7">
          <LikeButton />
          <ShareButton />
          <ChatroomSettingsButton />
        </div>
      }
    />
  );
};

export default ChatroomDetailHeader;
