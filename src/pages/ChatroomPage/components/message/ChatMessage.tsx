import { ChatMessageType } from '@/types/messageType';
import { RankingType } from '@/types/profileType';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';
import clsx from 'clsx';
import { formatDetailChatroomMessageTime } from '@/utils/chat/timeFormta';

interface Props {
  index?: number;
  message: ChatMessageType;
  isMine?: boolean;
  rankingType?: RankingType;
  showTime?: boolean;
}

const ChatMessage = ({ index, message, isMine, rankingType, showTime }: Props) => {
  const { messageType, content, sentAt, unreadBy } = message;

  const renderMessageBox = (
    <div
      className={clsx(
        'relative w-fit rounded-md px-5 py-2 whitespace-pre-line',
        isMine ? 'bg-pastelLime' : 'bg-white border border-strokeGray',
      )}>
      {messageType === 'TEXT' ? content : <img src={content!} alt="chat image" />}
      {index === 0 && isMine && rankingType === 'SAVER' && (
        <img src={SaverIcon} width={25} height={25} className="absolute -top-8 right-0" />
      )}
      {index === 0 && isMine && rankingType === 'FLEXER' && (
        <img src={FlexerIcon} width={30} height={30} className="absolute -top-8 right-0" />
      )}
    </div>
  );

  return (
    <div className={clsx('flex items-end gap-2.5', isMine ? 'justify-end' : 'justify-start')}>
      {!isMine && renderMessageBox}
      <div className={clsx('flex flex-col', isMine ? 'items-end' : 'items-start')}>
        {unreadBy.length > 0 && <p className="text-sm">{unreadBy.length}</p>}
        {showTime && (
          <p className="text-sm text-defaultGrey shrink-0 whitespace-nowrap">
            {formatDetailChatroomMessageTime(sentAt)}
          </p>
        )}
      </div>
      {isMine && renderMessageBox}
    </div>
  );
};

export default ChatMessage;
