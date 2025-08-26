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
}

const PhotoDetailModal = ({ chatroomId, photoId, closeModal }: Props) => {
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(photoId!);
  const { data: photoDetail, prefetch } = useGetPhotoDetail(chatroomId!, currentPhotoId);

  useEffect(() => {
    if (photoDetail?.prevPhotoId) prefetch(photoDetail.prevPhotoId);
    if (photoDetail?.nextPhotoId) prefetch(photoDetail.nextPhotoId);
  }, [photoDetail]);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center">
      {photoDetail && (
        <div className="w-[500px] h-full flex flex-col justify-center items-center bg-black relative">
          <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeModal} />

          <div className="text-white text-center absolute top-5">
            <p className="text-lg">{photoDetail.uploadedBy.nickname}</p>
            <p className="text-sm">
              {format(photoDetail.uploadedAt, 'yyyy년 MM월 dd일 a h시 mm분', {
                locale: ko,
              })}
            </p>
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
                  if (photoDetail?.prevPhotoId) {
                    setCurrentPhotoId(photoDetail.prevPhotoId);
                  }
                } else if (offset < -100 || velocity < -300) {
                  if (photoDetail?.nextPhotoId) {
                    setCurrentPhotoId(photoDetail.nextPhotoId);
                  }
                }
              }}
            />

            {photoDetail.prevPhotoId && (
              <button
                className="absolute left-3 p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => {
                  setCurrentPhotoId(photoDetail.prevPhotoId!);
                }}>
                <ChevronLeft size={40} />
              </button>
            )}

            {photoDetail.nextPhotoId && (
              <button
                className="absolute right-3 p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => {
                  setCurrentPhotoId(photoDetail.nextPhotoId!);
                }}>
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
