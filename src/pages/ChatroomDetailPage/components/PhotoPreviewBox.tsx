import ImageIcon from '@/components/icon/ImageIcon';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import clsx from 'clsx';
import SeeMoreButton from '@/pages/ChatroomDetailPage/components/SeeMoreButton';
import useGetRecentPhotoList from '@/hooks/apis/photo/useGetRecentPhotoList';
import { useNavigate } from 'react-router-dom';

interface Props {
  chatroomId: string;
}

const PhotoPreviewBox = ({ chatroomId }: Props) => {
  const navigate = useNavigate();
  const { data: photos } = useGetRecentPhotoList(chatroomId);
  const isEmpty = photos?.length === 0;
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleEnd } =
    useDraggableScroll();

  return (
    <div className="w-full border border-strokeGray pl-7 py-7 rounded-3xl">
      <div className="w-full flex justify-between items-center mb-10 pr-7">
        <h4 className="flex gap-1.5 items-center ">
          <ImageIcon />
          <span>사진</span>
        </h4>
        <SeeMoreButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/photos`)} />
      </div>
      {isEmpty || !photos ? (
        <div className="w-full h-32 pr-7 flex items-center justify-center text-defaultGrey">사진이 없습니다</div>
      ) : (
        <div
          ref={scrollRef}
          className="flex w-full gap-3 overflow-x-hidden select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}>
          {photos.map(({ photoId, photoUrl }, index) => (
            <img
              key={photoId}
              src={photoUrl}
              alt={`photo-${photoId}`}
              draggable={false}
              className={clsx(
                'w-32 shrink-0 cursor-pointer aspect-square object-cover border border-strokeGray bg-white',
                index === photos.length - 1 && 'mr-7',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoPreviewBox;
