import CircleCheckBox from '@/components/checkbox/CircleCheckBox';
import CrownIcon from '@/components/icon/CrownIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import clsx from 'clsx';

interface Props {
  chatroomImage: string;
  chatroomTitle: string;
  currentMemberCount: number;
  lastMessageTime: string;
  lastMessage?: string;
  isHost?: boolean;
  unreadMessageCount?: number | string;
  isEditMode?: boolean;
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
}: Props) => {
  return (
    <div role="button" className="flex w-full items-center cursor-pointer">
      {isEditMode && <CircleCheckBox className="p-10 shrink-0" />}
      <div className="flex flex-1 justify-between gap-3.5 p-5 min-w-0">
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <ProfilePhoto photo={chatroomImage} className="w-25 shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <p className="flex gap-2.5 items-center min-w-0">
              {isHost && <CrownIcon />}
              <div className="flex gap-1.5 items-end min-w-0">
                <span className="truncate">{chatroomTitle}</span>
                <span className="text-sm text-defaultGrey whitespace-nowrap">{currentMemberCount}</span>
              </div>
            </p>
            <p className="text-sm text-defaultGrey truncate min-w-0 whitespace-nowrap">{lastMessage}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-2.5 shrink-0">
          <time className="w-fit text-sm whitespace-nowrap">{lastMessageTime}</time>
          <div
            className={clsx(
              'w-fit flex items-center justify-center min-h-8 aspect-square text-sm rounded-full text-white p-1.5',
              unreadMessageCount && 'bg-sunsetRose',
            )}>
            {unreadMessageCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinedChatroomItem;
