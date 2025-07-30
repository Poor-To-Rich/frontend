import SubActionButton from '@/components/button/SubActionButton';
import UserIcon from '@/components/icon/UserIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { PublicChatroomType } from '@/types/chatTypes';
import { formatPublicLastMessageTime } from '@/utils/chat/timeFormta';

interface Props extends PublicChatroomType {
  isEditMode?: boolean;
}

const PublicChatroomItem = ({
  chatroomImage,
  chatroomTitle,
  description,
  hashtags,
  currentMemberCount,
  maxMemberCount,
  lastMessageTime,
  isEditMode,
}: Props) => {
  const messageTimeFormat = formatPublicLastMessageTime(lastMessageTime);
  return (
    <div className="flex items-center gap-7 w-full min-w-0 cursor-pointer">
      <ProfilePhoto photo={chatroomImage} className="w-32 shrink-0" />
      <div className="flex flex-col gap-2.5 flex-1 min-w-0">
        <p className="truncate">{chatroomTitle}</p>
        <p className="text-sm text-defaultGrey truncate overflow-hidden whitespace-nowrap min-w-0">
          {description}&nbsp;
          {hashtags?.map((hashtag, idx) => <span key={idx}>#{hashtag} </span>)}
        </p>
        <div className="flex items-center gap-1.5">
          <UserIcon size={15} className="mb-0.5" />
          <p className="text-sm">
            <span className="text-defaultGrey">
              {currentMemberCount}/{maxMemberCount}
            </span>{' '}
            {messageTimeFormat && <time>| {messageTimeFormat}</time>}
          </p>
        </div>
      </div>
      {isEditMode && (
        <div className="h-12">
          <SubActionButton label="편집" />
        </div>
      )}
    </div>
  );
};

export default PublicChatroomItem;
