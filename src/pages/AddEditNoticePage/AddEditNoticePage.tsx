import NoticeEditorHeader from '@/components/header/NoticeEditorHeader';
import useAddNotice from '@/hooks/apis/notice/useAddNotice';
import useGetNotice from '@/hooks/apis/notice/useGetNotice';
import useUpdateNotice from '@/hooks/apis/notice/useUpdateNotice';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddEditNoticePage = () => {
  const { chatroomId, noticeId } = useParams();
  const { data: noticeDetail } = useGetNotice(chatroomId!, noticeId!);
  const { mutate: addNotice } = useAddNotice(chatroomId!);
  const { mutate: updateNotice } = useUpdateNotice(chatroomId!, noticeId!);
  const [noticeContent, setNoticeContent] = useState<string>(noticeDetail?.content ?? '');

  const isEdit = !!noticeId;

  const handleSubmit = () => {
    const body = {
      content: noticeContent,
    };
    if (isEdit) {
      updateNotice(body);
    } else addNotice(body);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <NoticeEditorHeader
        label={isEdit ? '공지 수정하기' : '공지 작성하기'}
        disabled={noticeContent.length <= 0}
        onSubmit={handleSubmit}
      />
      <textarea
        value={noticeContent}
        onChange={e => setNoticeContent(e.target.value)}
        placeholder="공지를 작성해주세요"
        className="flex-grow resize-none p-3.5 m-3.5 focus:outline-none placeholder:text-defaultGrey "
      />
    </div>
  );
};

export default AddEditNoticePage;
