import SubActionButton from '@/components/button/SubActionButton';
import UserIcon from '@/components/icon/UserIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { ALL_CHATROOM_SCROLL_KEY } from '@/constants/storageKeys';
import { PublicChatroomType } from '@/types/chatTypes';
import { formatPublicLastMessageTime } from '@/utils/chat/timeFormta';
import { useNavigate } from 'react-router-dom';

interface Props extends PublicChatroomType {
  isEditMode?: boolean;
}

const PublicChatroomItem = ({
  chatroomId,
  chatroomImage,
  chatroomTitle,
  description,
  hashtags,
  currentMemberCount,
  maxMemberCount,
  lastMessageTime,
  isEditMode,
}: Props) => {
  const navigate = useNavigate();
  const messageTimeFormat = formatPublicLastMessageTime(lastMessageTime);

  const handleClick = () => {
    sessionStorage.setItem(ALL_CHATROOM_SCROLL_KEY, String(window.scrollY));
    navigate(`/chat/chatroom/${chatroomId}/cover`);
  };

  return (
    <div onClick={handleClick} className="flex items-center gap-7 w-full min-w-0 cursor-pointer">
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
          <SubActionButton
            label="편집"
            onClick={e => {
              e.stopPropagation();
              navigate(`/chat/chatroom/${chatroomId}/edit`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PublicChatroomItem;
