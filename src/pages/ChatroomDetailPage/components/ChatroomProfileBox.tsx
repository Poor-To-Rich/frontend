import UtilityButton from '@/components/button/UtilityButton';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import useGetChatroomDetails from '@/hooks/apis/chat/useGetChatroomDetails';
import { useNavigate } from 'react-router-dom';

interface Props {
  chatroomId: string;
}

const ChatroomProfileBox = ({ chatroomId }: Props) => {
  const navigate = useNavigate();
  const { data: chatroomDetails } = useGetChatroomDetails(chatroomId);

  return (
    <div className="w-full flex gap-10 mb-5">
      {chatroomDetails && (
        <>
          <ProfilePhoto photo={chatroomDetails.chatroomImage} className="shrink-0 w-40 sm:w-50" />
          <div className="flex flex-col gap-2.5 justify-between flex-grow">
            <p>{chatroomDetails.chatroomTitle}</p>
            <div className="w-full flex gap-3.5">
              <UtilityButton
                label="커버보기"
                className="w-1/2"
                onClick={() => navigate(`/chat/chatroom/cover/${chatroomId}`)}
              />
              <UtilityButton
                label="채팅방 편집"
                className="w-1/2"
                onClick={() => navigate(`/chat/chatroom/edit/${chatroomId}`)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatroomProfileBox;
