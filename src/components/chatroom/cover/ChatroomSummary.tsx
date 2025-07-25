import LikeButton from '@/components/button/icon/LikeButton';
import UserIcon from '@/components/icon/UserIcon';

interface Props {
  chatroomTitle: string;
  currentMemberCount: number;
  maxMemberCount: number;
  createdAt: string;
  likeCount: number;
}

const ChatroomSummary = ({ chatroomTitle, currentMemberCount, maxMemberCount, createdAt, likeCount }: Props) => {
  return (
    <div className="flex w-full justify-between p-5">
      <div className="flex flex-col gap-1.5">
        <p className="text-2xl">{chatroomTitle}</p>
        <div className="flex items-center gap-1.5">
          <UserIcon size={15} className={'mb-0.5'} />
          <p className="text-md">
            <span className="text-defaultGrey">
              {currentMemberCount}/{maxMemberCount}{' '}
            </span>
            | <span>개설일 {createdAt}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start">
        <LikeButton />
        <p className="text-sunsetRose text-md">{likeCount}</p>
      </div>
    </div>
  );
};

export default ChatroomSummary;
