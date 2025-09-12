import XIconButton from '@/components/button/icon/XIconButton';
import useGetPhotoDetail from '@/hooks/apis/photo/useGetPhotoDetail';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import PhotoNavButton from '@/components/modal/photo/PhotoNavButton';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  chatroomId?: string;
  photoId?: number;
  closeModal?: () => void;
  reverseOrder?: boolean;
}

const PhotoDetailModal = ({ chatroomId, photoId, closeModal, reverseOrder }: Props) => {
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(photoId!);
  const { data: photoDetail, prefetch } = useGetPhotoDetail(chatroomId!, currentPhotoId);

  const [scale, setScale] = useState(1);
  const [showNav, setShowNav] = useState(window.innerWidth < 768);

  const prevId = photoDetail ? (reverseOrder ? photoDetail.nextPhotoId : photoDetail.prevPhotoId) : null;
  const nextId = photoDetail ? (reverseOrder ? photoDetail.prevPhotoId : photoDetail.nextPhotoId) : null;

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setShowNav(prev => !prev);
    }
  };

  const handleNavButtonClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setCurrentPhotoId(id);
  };

  useEffect(() => {
    if (prevId) prefetch(prevId);
    if (nextId) prefetch(nextId);
  }, [prevId, nextId]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-stretch justify-center">
      {photoDetail && (
        <div
          onClick={handleClick}
          className="w-[500px] h-full flex flex-col justify-center items-center bg-black relative">
          <div className="relative w-full h-full flex justify-center items-center group overflow-hidden">
            <div
              className={clsx(
                'absolute top-0 left-0 w-full p-2 bg-black/50 text-white transition-opacity duration-300 z-50',
                showNav ? 'opacity-100' : 'opacity-0 md:opacity-0 md:group-hover:opacity-100',
              )}>
              <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeModal} />

              <div className="text-center">
                <p className="text-lg">{photoDetail.uploadedBy.nickname}</p>
                <p className="text-sm">
                  {format(photoDetail.uploadedAt, 'yyyy년 MM월 dd일 a h시 mm분', { locale: ko })}
                </p>
              </div>
            </div>

            <motion.div
              key={currentPhotoId}
              drag={scale === 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (scale === 1) {
                  if (info.offset.x > 100 && prevId) setCurrentPhotoId(prevId);
                  else if (info.offset.x < -100 && nextId) setCurrentPhotoId(nextId);
                }
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full h-full flex items-center justify-center">
              <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={3}
                wheel={{ step: 0.2 }}
                pinch={{ step: 5 }}
                doubleClick={{ disabled: true }}
                panning={{
                  velocityDisabled: true,
                  lockAxisX: scale > 1 ? false : true,
                  lockAxisY: scale > 1 ? false : true,
                }}
                onTransformed={ref => setScale(ref.state.scale)}>
                <TransformComponent wrapperClass="w-full h-full flex items-center justify-center">
                  <img src={photoDetail.photoUrl} alt="이미지" className="max-w-full max-h-[90vh] object-contain" />
                </TransformComponent>
              </TransformWrapper>
            </motion.div>

            {prevId && (
              <PhotoNavButton position="left" showNav={showNav} onClick={e => handleNavButtonClick(e, prevId)}>
                <ChevronLeft size={40} />
              </PhotoNavButton>
            )}
            {nextId && (
              <PhotoNavButton position="right" showNav={showNav} onClick={e => handleNavButtonClick(e, nextId)}>
                <ChevronRight size={40} />
              </PhotoNavButton>
            )}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
};

export default PhotoDetailModal;
