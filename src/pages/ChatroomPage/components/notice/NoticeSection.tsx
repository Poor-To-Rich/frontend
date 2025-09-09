import UtilityButton from '@/components/button/UtilityButton';
import MegaphoneIcon from '@/components/icon/MegaphoneIcon';
import useUpdateRecentNoticeStatus from '@/hooks/apis/notice/useUpdateRecentNoticeStatus';
import { RecentNoticeType } from '@/types/noticeType';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const NoticeSection = ({ status, preview, noticeId }: RecentNoticeType) => {
  const { chatroomId } = useParams();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { mutate: updateRecentNoticeStatus } = useUpdateRecentNoticeStatus(chatroomId!);

  if (status === 'PERMANENT_HIDDEN') return null;

  return (
    <>
      {status === 'DEFAULT' && (
        <div className="flex flex-col ml-3.5 sticky top-2.5 z-10 gap-5 border border-strokeGray rounded-3xl pl-5 py-5 pr-3.5 bg-white whitespace-nowrap min-w-0 ">
          <div className="w-full flex justify-start items-center whitespace-nowrap min-w-0 relative">
            <div
              className="flex gap-2.5 flex-grow cursor-pointer"
              onClick={() => navigate(`/chat/chatroom/${chatroomId}/notices/${noticeId}`)}>
              <MegaphoneIcon />
              <p className="truncate">{preview}</p>
            </div>
            <button className="px-1.5 right-0 cursor-pointer" onClick={() => setIsClicked(prev => !prev)}>
              <ChevronDown
                color="#adadad"
                className={`transform transition-transform duration-200 ${isClicked ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
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
        <div className="w-full flex justify-end sticky top-3 pr-3 z-50">
          <div
            className="w-fit p-3 rounded-full bg-white border border-strokeGray cursor-pointer"
            onClick={() => updateRecentNoticeStatus({ status: 'DEFAULT' })}>
            <MegaphoneIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeSection;
