import { useState } from 'react';
import UserProfile from '@/components/profile/UserProfile';
import useGetAllChatroomMembers from '@/hooks/apis/chat/useGetAllChatroomMembers';

interface Props {
  chatroomId: string;
}

const ChatMemberBox = ({ chatroomId }: Props) => {
  const { data } = useGetAllChatroomMembers(chatroomId);
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedMembers = showAll ? data?.members : data?.members.slice(0, 20);

  return (
    <div className="w-full border border-strokeGray pt-7 rounded-3xl">
      {data && displayedMembers && (
        <>
          <div className="w-full flex justify-between items-center mx-7">
            <h4>
              참여인원 <span className="text-md">{data?.memberCount}</span>
            </h4>
          </div>
          <div className="flex flex-col p-7 gap-3 ">
            {displayedMembers.map(member => (
              <UserProfile key={member.userId} userProfile={member} chatroomId={chatroomId} />
            ))}
          </div>
          {data?.memberCount > 20 && (
            <button
              className="w-full border-t text-defaultGrey border-strokeGray py-3 cursor-pointer"
              onClick={() => setShowAll(prev => !prev)}>
              {showAll ? '접기' : '전체보기'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMemberBox;
