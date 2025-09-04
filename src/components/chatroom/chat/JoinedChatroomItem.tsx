import CircleCheckBox from '@/components/checkbox/CircleCheckBox';
import CrownIcon from '@/components/icon/CrownIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { JoinedChatroomType } from '@/types/chatTypes';
import { formatDetailLastMessageTime } from '@/utils/chat/timeFormta';
import clsx from 'clsx';

interface Props extends JoinedChatroomType {
  isEditMode?: boolean;
  isChecked?: boolean;
  onClick?: () => void;
}

const JoinedChatroomItem = ({
  chatroomImage,
  chatroomTitle,
  currentMemberCount,
  lastMessageTime,
  lastMessage,
  isHost,
  unreadMessageCount,
  isEditMode,
  isChecked,
  onClick,
}: Props) => {
  const messageTimeFormat = formatDetailLastMessageTime(lastMessageTime);

  return (
    <div role="button" className="flex w-full items-center cursor-pointer" onClick={onClick}>
      {isEditMode && <CircleCheckBox className="p-7 shrink-0" isChecked={isChecked} />}
      <div className="flex flex-1 justify-between gap-5 min-w-0">
        <div className="flex flex-1 items-center gap-7 min-w-0">
          <ProfilePhoto photo={chatroomImage} className="w-25 shrink-0 cursor-pointer" />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="flex gap-2.5 items-center min-w-0">
              {isHost && <CrownIcon className="shrink-0" />}
              <div className="flex gap-1.5 items-end min-w-0">
                <span className="truncate">{chatroomTitle}</span>
                <span className="text-defaultGrey whitespace-nowrap">{currentMemberCount}</span>
              </div>
            </div>
            <p className="text-md text-defaultGrey truncate min-w-0 whitespace-nowrap">{lastMessage}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start gap-1.5 shrink-0">
          <time className="w-fit text-sm whitespace-nowrap">{messageTimeFormat}</time>
          {!!unreadMessageCount && unreadMessageCount > 0 && (
            <div
              className={clsx(
                'w-fit mt-2.5 flex items-center justify-center min-h-8 aspect-square text-sm rounded-full text-white p-1.5 leading-1.5',
                unreadMessageCount && 'bg-sunsetRose',
              )}>
              {unreadMessageCount >= 100 ? '99+' : unreadMessageCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinedChatroomItem;
