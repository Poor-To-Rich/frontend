import ImageIcon from '@/components/icon/ImageIcon';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import clsx from 'clsx';
import SeeMoreButton from '@/components/chatroom/detail/SeeMoreButton';

interface Props {
  photos: {
    photoId: number;
    photoUrl: string;
  }[];
}

const PhotoPreviewBox = ({ photos }: Props) => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleEnd } =
    useDraggableScroll();

  return (
    <div className="w-full border border-strokeGray pl-7 py-7 rounded-3xl">
      <div className="w-full flex justify-between items-center mb-10 pr-7">
        <h4 className="flex gap-1.5 items-center ">
          <ImageIcon />
          <span>사진</span>
        </h4>
        <SeeMoreButton />
      </div>

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
              'w-32 shrink-0 cursor-pointer aspect-square object-cover border border-strokeGray rounded-lg',
              index === photos.length - 1 && 'mr-7',
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoPreviewBox;
