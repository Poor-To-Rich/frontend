import { uploadChatroomPhoto } from '@/api/services/imageService';
import { stompClient } from '@/api/stomp';
import { useMutation } from '@tanstack/react-query';

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
  });
};

export default useUploadChatroomPhoto;
