import XIconButton from '@/components/button/icon/XIconButton';
import useGetPhotoDetail from '@/hooks/apis/photo/useGetPhotoDetail';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  chatroomId?: string;
  photoId?: number;
  closeModal?: () => void;
  reverseOrder?: boolean;
}

const PhotoDetailModal = ({ chatroomId, photoId, closeModal, reverseOrder }: Props) => {
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(photoId!);
  const { data: photoDetail, prefetch } = useGetPhotoDetail(chatroomId!, currentPhotoId);

  const prevId = photoDetail ? (reverseOrder ? photoDetail.nextPhotoId : photoDetail.prevPhotoId) : null;
  const nextId = photoDetail ? (reverseOrder ? photoDetail.prevPhotoId : photoDetail.nextPhotoId) : null;

  useEffect(() => {
    if (prevId) prefetch(prevId);
    if (nextId) prefetch(nextId);
  }, [prevId, nextId]);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center">
      {photoDetail && (
        <div className="w-[500px] h-full flex flex-col justify-center items-center bg-black relative">
          <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeModal} />

          <div className="text-white text-center absolute top-5">
            <p className="text-lg">{photoDetail.uploadedBy.nickname}</p>
            <p className="text-sm">{format(photoDetail.uploadedAt, 'yyyy년 MM월 dd일 a h시 mm분', { locale: ko })}</p>
          </div>

          <div className="relative w-full h-[75%] flex justify-center items-center group overflow-hidden">
            <motion.img
              key={photoDetail.photoId}
              src={photoDetail.photoUrl}
              alt="이미지"
              className="w-full max-h-full object-contain"
              drag="x"
              dragElastic={1}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                if (offset > 100 || velocity > 300) {
                  if (prevId) setCurrentPhotoId(prevId);
                } else if (offset < -100 || velocity < -300) {
                  if (nextId) setCurrentPhotoId(nextId);
                }
              }}
            />

            {prevId && (
              <button
                className="absolute left-3 p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setCurrentPhotoId(prevId)}>
                <ChevronLeft size={40} />
              </button>
            )}

            {nextId && (
              <button
                className="absolute right-3 p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setCurrentPhotoId(nextId)}>
                <ChevronRight size={40} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDetailModal;
