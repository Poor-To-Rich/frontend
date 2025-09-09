import NoticeEditorHeader from '@/components/header/NoticeEditorHeader';
import useAddNotice from '@/hooks/apis/notice/useAddNotice';
import useUpdateNotice from '@/hooks/apis/notice/useUpdateNotice';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoticeForm from '@/pages/AddEditNoticePage/components/NoticeForm';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const AddEditNoticePage = () => {
  const { chatroomId, noticeId } = useParams();
  const { mutate: addNotice } = useAddNotice(chatroomId!);
  const { mutate: updateNotice } = useUpdateNotice(chatroomId!, noticeId!);

  const [noticeContent, setNoticeContent] = useState<string>('');

  const isEdit = !!noticeId;

  const handleNoticeContent = (value: string) => {
    setNoticeContent(value);
  };

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
      <PageErrorBoundary>
        <FetchErrorBoundary>
          <NoticeForm
            chatroomId={chatroomId}
            noticeId={noticeId}
            noticeContent={noticeContent}
            handleNoticeContent={handleNoticeContent}
          />
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default AddEditNoticePage;
