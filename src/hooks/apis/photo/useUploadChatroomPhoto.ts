import { uploadChatroomPhoto } from '@/api/services/photoService';
import { stompClient } from '@/api/stomp';
import CustomError from '@/utils/error/CustomError';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUploadChatroomPhoto = (
  chatroomId: string,
  setPhotoFile: React.Dispatch<React.SetStateAction<File | null>>,
) => {
  return useMutation({
    mutationFn: (body: FormData) => uploadChatroomPhoto(chatroomId, body),
    onSuccess: data => {
      stompClient.publish({
        destination: `/pub/chat/messages`,
        body: JSON.stringify({
          chatroomId: Number(chatroomId),
          messageType: 'PHOTO',
          content: data?.photoUrl,
        }),
      });
      setPhotoFile(null);
    },
    onError: error => {
      if (error instanceof CustomError) {
        const message = error.statusCode === 413 ? '파일 크기는 최대 5MB까지 업로드 가능합니다' : error.message;
        toast.error(message);
      }
    },
  });
};

export default useUploadChatroomPhoto;
