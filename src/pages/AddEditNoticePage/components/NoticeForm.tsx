import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetNotice from '@/hooks/apis/notice/useGetNotice';
import { useEffect } from 'react';

interface Props {
  chatroomId?: string;
  noticeId?: string;
  noticeContent: string;
  handleNoticeContent: (value: string) => void;
}

const NoticeForm = ({ chatroomId, noticeId, noticeContent, handleNoticeContent }: Props) => {
  const { data: noticeDetail, isPending } = useGetNotice(chatroomId!, noticeId!);

  useEffect(() => {
    if (noticeDetail) {
      handleNoticeContent(noticeDetail.content);
    }
  }, [noticeDetail]);

  if (isPending) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <textarea
      value={noticeContent}
      onChange={e => handleNoticeContent(e.target.value)}
      placeholder="공지를 작성해주세요"
      className="flex-grow resize-none p-3.5 m-3.5 focus:outline-none placeholder:text-defaultGrey "
    />
  );
};

export default NoticeForm;
