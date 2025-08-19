import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import InputActionBox from '@/components/chatroom/input/InputActionBox';
import DefaultHeader from '@/components/header/DefaultHeader';
import DelegateUserItem from './components/DelegateUserItem';
import { useNavigate, useParams } from 'react-router-dom';
import useGetAllChatroomMembers from '@/hooks/apis/chat/useGetAllChatroomMembers';

const ChatroomHostDelegatePage = () => {
  const { chatroomId } = useParams();
  const { data: allChatroomMembers } = useGetAllChatroomMembers(chatroomId!);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="방장 위임" />
      {chatroomId && (
        <div className="flex flex-col p-5 gap-10">
          <InputActionBox placeholder="닉네임 검색" />
          <div className="flex flex-col gap-3.5">
            <h6 className="text-md">참여자</h6>
            {allChatroomMembers &&
              allChatroomMembers.members.map(member => (
                <DelegateUserItem chatroomId={chatroomId} userProfile={member} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatroomHostDelegatePage;
