import { uploadChatroomPhoto } from '@/api/services/photoService';
import { stompClient } from '@/api/stomp';
import { scrollToBottom } from '@/utils/chat/scrollToBottom';
import { useMutation } from '@tanstack/react-query';
import { MutableRefObject } from 'react';

const useUploadChatroomPhoto = (
  chatroomId: string,
  handleClearPhotoStatus: () => void,
  scrollRef?: MutableRefObject<HTMLDivElement | null>,
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

      if (scrollRef) {
        setTimeout(() => scrollToBottom(scrollRef, 'instant'), 0);
      }

      handleClearPhotoStatus();
    },
  });
};

export default useUploadChatroomPhoto;
