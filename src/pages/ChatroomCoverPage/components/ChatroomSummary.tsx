import LikeButton from '@/components/button/icon/LikeButton';
import UserIcon from '@/components/icon/UserIcon';
import useGetChatroomLikeStatus from '@/hooks/apis/chat/useGetChatroomLikeStatus';

interface Props {
  chatroomId: string;
  chatroomTitle: string;
  currentMemberCount: number;
  maxMemberCount: number;
  createdAt: string;
}

const ChatroomSummary = ({ chatroomId, chatroomTitle, currentMemberCount, maxMemberCount, createdAt }: Props) => {
  const { data: likeStatus } = useGetChatroomLikeStatus(chatroomId);

  return (
    <div className="flex w-full justify-between">
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
        <LikeButton isLiked={likeStatus?.isLiked} />
        <p className="text-sunsetRose text-md">{likeStatus?.likeCount}</p>
      </div>
    </div>
  );
};

export default ChatroomSummary;
