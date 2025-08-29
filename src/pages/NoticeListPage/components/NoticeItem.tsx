import { NoticeItemType } from '@/types/noticeType';
import { parseServerUTC } from '@/utils/chat/timeFormta';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface Props extends NoticeItemType {
  chatroomId: string;
  hasUnderLine: boolean;
}

const NoticeItem = ({ chatroomId, noticeId, preview, createdAt, authorNickname, hasUnderLine }: Props) => {
  return (
    <Link
      to={`/chat/chatroom/${chatroomId}/notices/${noticeId}`}
      className={clsx('flex flex-col gap-3 p-7 cursor-pointer', hasUnderLine && 'border-b border-strokeGray')}>
      <p className="whitespace-nowrap truncate">{preview}</p>
      <p className="text-md">
        {format(parseServerUTC(createdAt), 'yyyy년 MM월 dd일 a h시 mm분', { locale: ko })} {authorNickname}
      </p>
    </Link>
  );
};

export default NoticeItem;
