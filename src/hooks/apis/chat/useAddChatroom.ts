import { addChatroom } from '@/api/services/chatService';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useAddChatroom = (setError: UseFormSetError<ChatroomFormDataType>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addChatroom,
    onSuccess: data => {
      navigate(`/chat/chatroom/${data}`, { replace: true });
    },
    onError: createFormErrorHandler(setError),
  });
};

export default useAddChatroom;
