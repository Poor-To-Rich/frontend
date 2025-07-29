import { useState } from 'react';
import UserProfile from '@/components/profile/UserProfile';
import { UserProfileType } from '@/types/profileType';

interface Props {
  members: UserProfileType[];
}

const ChatMemberBox = ({ members }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const displayedMembers = showAll ? members : members.slice(0, 20);

  return (
    <div className="w-full border border-strokeGray pt-7 rounded-3xl">
      <div className="w-full flex justify-between items-center mx-7">
        <h4>
          참여인원 <span className="text-md">{members.length}</span>
        </h4>
      </div>
      <div className="flex flex-col p-7 gap-3 ">
        {displayedMembers.map(member => (
          <UserProfile key={member.userId} {...member} />
        ))}
      </div>
      {members.length > 20 && (
        <button
          className="w-full border-t text-defaultGrey border-strokeGray py-3 cursor-pointer"
          onClick={() => setShowAll(prev => !prev)}>
          {showAll ? '접기' : '전체보기'}
        </button>
      )}
    </div>
  );
};

export default ChatMemberBox;
