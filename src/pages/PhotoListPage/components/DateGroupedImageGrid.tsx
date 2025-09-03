import PhotoDetailModal from '@/components/modal/photo/PhotoDetailModal';
import useModal from '@/hooks/useModal';
import { PhotosByDateType } from '@/types/photoType';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props extends PhotosByDateType {
  chatroomId: string;
}

const DateGroupedImageGrid = ({ chatroomId, date, photos }: Props) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex flex-col p-5 gap-5">
      <h6>{format(date, 'yyyy.MM.dd')}</h6>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 justify-center">
        {photos.map(({ photoId, photoUrl }) => (
          <img
            key={photoId}
            src={photoUrl}
            alt={`photo-${photoId}`}
            className="w-full shrink-0 cursor-pointer aspect-square object-cover border border-strokeGray"
            onClick={() => {
              setSelectedPhoto(photoId);
              openModal();
            }}
          />
        ))}
      </div>
      {isOpen && selectedPhoto && (
        <PhotoDetailModal chatroomId={chatroomId} photoId={selectedPhoto} closeModal={closeModal} reverseOrder />
      )}
    </div>
  );
};

export default DateGroupedImageGrid;
