import MegaphoneIcon from '@/components/icon/MegaphoneIcon';
import SeeMoreButton from '@/components/chatroom/detail/SeeMoreButton';

interface Props {
  notices: {
    noticeId: number;
    preview: string;
  }[];
}

const NoticePreviewBox = ({ notices }: Props) => {
  const isEmpty = notices.length === 0;

  return (
    <div className="w-full border border-strokeGray p-7 rounded-3xl">
      <div className="w-full flex justify-between items-center mb-7">
        <h4 className="flex gap-1.5 items-center ">
          <MegaphoneIcon />
          <span>공지</span>
        </h4>
        <SeeMoreButton />
      </div>
      {isEmpty ? (
        <div className="w-full h-32 flex items-center justify-center text-defaultGrey">공지가 없습니다</div>
      ) : (
        <div className="flex flex-col w-full gap-5 overflow-x-hidden select-none">
          {notices.map(({ noticeId, preview }) => (
            <p key={noticeId} className="whitespace-nowrap truncate cursor-pointer">
              {preview}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticePreviewBox;
