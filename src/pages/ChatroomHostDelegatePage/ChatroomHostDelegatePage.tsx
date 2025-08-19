import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import InputActionBox from '@/components/chatroom/input/InputActionBox';
import DefaultHeader from '@/components/header/DefaultHeader';
import DelegateUserItem from './components/DelegateUserItem';
import { useNavigate, useParams } from 'react-router-dom';
import useGetAllChatroomMembers from '@/hooks/apis/chat/useGetAllChatroomMembers';
import useSearchChatroomMembers from '@/hooks/apis/chat/useSearchChatroomMembers';
import { useMemo, useState } from 'react';
import { debounce } from 'lodash';

const ChatroomHostDelegatePage = () => {
  const { chatroomId } = useParams();
  const [searchNickname, setSearchNickname] = useState<string>('');
  const { data: allChatroomMembers } = useGetAllChatroomMembers(chatroomId!);
  const { data: searchChatroomMembers } = useSearchChatroomMembers(chatroomId!, searchNickname);
  const navigate = useNavigate();

  const chatroomMembers = searchChatroomMembers ?? allChatroomMembers;

  const debouncedChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearchNickname(value);
      }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedChange(e.target.value);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="방장 위임" />
      {chatroomId && (
        <div className="flex flex-col p-5 gap-10">
          <InputActionBox placeholder="닉네임 검색" onChange={handleChange} />
          <div className="flex flex-col gap-3.5">
            <h6 className="text-md">참여자</h6>
            {chatroomMembers &&
              chatroomMembers.members.map(member => (
                <DelegateUserItem key={member.userId} chatroomId={chatroomId} userProfile={member} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatroomHostDelegatePage;
