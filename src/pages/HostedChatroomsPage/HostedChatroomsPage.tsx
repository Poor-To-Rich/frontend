import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetHostedChatrooms from '@/hooks/apis/chat/useGetHostedChatrooms';
import { useNavigate } from 'react-router-dom';

const HostedChatroomsPage = () => {
  const navigate = useNavigate();
  const { data: hostedChatrooms } = useGetHostedChatrooms();

  return (
    <div className="w-full flex flex-col relative">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label="나의 채팅방"
        rightButton={<PlusButton onClick={() => navigate('/chat/chatroom/add')} />}
      />
      <div className="w-full flex flex-col gap-3.5 p-5">
        {hostedChatrooms?.map(chatroom => <PublicChatroomItem {...chatroom} isEditMode />)}
      </div>
    </div>
  );
};

export default HostedChatroomsPage;
