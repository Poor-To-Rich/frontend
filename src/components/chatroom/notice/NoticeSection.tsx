import UtilityButton from '@/components/button/UtilityButton';
import DropdownIcon from '@/components/icon/DropdownIcon';
import MegaphoneIcon from '@/components/icon/MegaphoneIcon';
import { ChatroomNoticeBanner, ChatroomNoticeStatus } from '@/utils/chat/notice';
import { useState } from 'react';

const NoticeSection = ({ status, preview }: ChatroomNoticeBanner) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [noticeStatus, setNoticeStatus] = useState<ChatroomNoticeStatus>(status);

  if (noticeStatus === 'PERMANENT_HIDDEN') return null;

  return (
    <>
      {noticeStatus === 'DEFAULT' && (
        <div
          className="flex flex-col sticky top-0 z-10 gap-5 w-full border border-strokeGray rounded-3xl p-5 bg-white whitespace-nowrap min-w-0"
          onClick={() => setIsClicked(prev => !prev)}>
          <div className="w-full flex justify-center items-center gap-2.5 whitespace-nowrap min-w-0">
            <MegaphoneIcon />
            <p className="truncate">{preview}</p>
            <DropdownIcon />
          </div>
          {isClicked && (
            <div className="w-full flex gap-3 px-1.5" onClick={e => e.stopPropagation()}>
              <UtilityButton
                label="다시 열지않음"
                className="flex-1"
                onClick={() => setNoticeStatus('PERMANENT_HIDDEN')}
              />
              <UtilityButton
                label="접어두기"
                className="flex-1"
                onClick={() => {
                  setNoticeStatus('TEMP_HIDDEN');
                  setIsClicked(false);
                }}
              />
            </div>
          )}
        </div>
      )}
      {noticeStatus === 'TEMP_HIDDEN' && (
        <div className="w-full flex justify-end sticky top-0 z-50">
          <div
            className="w-fit p-3 rounded-full bg-white border border-strokeGray"
            onClick={() => setNoticeStatus('DEFAULT')}>
            <MegaphoneIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeSection;
