import UtilityButton from '@/components/button/UtilityButton';
import DropdownIcon from '@/components/icon/DropdownIcon';
import MegaphoneIcon from '@/components/icon/MegaphoneIcon';
import useUpdateRecentNoticeStatus from '@/hooks/apis/notice/useUpdateRecentNoticeStatus';
import { RecentNoticeType } from '@/types/noticeType';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const NoticeSection = ({ status, preview }: RecentNoticeType) => {
  const { chatroomId } = useParams();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { mutate: updateRecentNoticeStatus } = useUpdateRecentNoticeStatus(chatroomId!);

  if (status === 'PERMANENT_HIDDEN') return null;

  return (
    <>
      {status === 'DEFAULT' && (
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
                onClick={() => updateRecentNoticeStatus({ status: 'PERMANENT_HIDDEN' })}
              />
              <UtilityButton
                label="접어두기"
                className="flex-1"
                onClick={() => {
                  updateRecentNoticeStatus({ status: 'TEMP_HIDDEN' });
                  setIsClicked(false);
                }}
              />
            </div>
          )}
        </div>
      )}
      {status === 'TEMP_HIDDEN' && (
        <div className="w-full flex justify-end sticky top-0 z-50">
          <div
            className="w-fit p-3 rounded-full bg-white border border-strokeGray"
            onClick={() => updateRecentNoticeStatus({ status: 'DEFAULT' })}>
            <MegaphoneIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeSection;
