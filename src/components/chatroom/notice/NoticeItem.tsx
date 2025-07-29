import { NoticeItemType } from '@/types/noticeType';
import clsx from 'clsx';

interface Props extends NoticeItemType {
  hasUnderLine: boolean;
}

const NoticeItem = ({ preview, createdAt, authorNickname, hasUnderLine }: Props) => {
  return (
    <div className={clsx('flex flex-col gap-3 p-7', hasUnderLine && 'border-b border-strokeGray')}>
      <p className="whitespace-nowrap truncate">{preview}</p>
      <p className="text-md">
        {createdAt} {authorNickname}
      </p>
    </div>
  );
};

export default NoticeItem;
