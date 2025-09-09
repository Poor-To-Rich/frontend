import { addChatroom } from '@/api/services/chatService';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useAddChatroom = (setError: UseFormSetError<ChatroomFormDataType>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addChatroom,
    onSuccess: data => {
      navigate(`/chat/chatroom/${data}`, { replace: true });

      queryClient.refetchQueries({ queryKey: joinedChatroomsQueryKey });
    },
    onError: createFormErrorHandler(setError),
  });
};

export default useAddChatroom;
