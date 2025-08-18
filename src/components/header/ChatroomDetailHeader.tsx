import { useNavigate } from 'react-router-dom';
import DefaultHeader from '@/components/header/DefaultHeader';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import LikeButton from '@/components/button/icon/LikeButton';
import ShareButton from '@/components/button/icon/ShareButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';
import useGetChatroomLikeStatus from '@/hooks/apis/chat/useGetChatroomLikeStatus';

interface Props {
  chatroomId: string;
}

const ChatroomDetailHeader = ({ chatroomId }: Props) => {
  const navigate = useNavigate();
  const { data } = useGetChatroomLikeStatus(chatroomId);

  return (
    <DefaultHeader
      leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
      rightButton={
        <div className="h-full flex items-center gap-3 mr-7">
          <LikeButton isLiked={data?.isLiked} />
          <ShareButton />
          <ChatroomSettingsButton />
        </div>
      }
    />
  );
};

export default ChatroomDetailHeader;
