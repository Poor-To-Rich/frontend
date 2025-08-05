import { editChatroom } from '@/api/services/chatService';
import { ChatroomFormDataType } from '@/types/chatTypes';
import { createFormErrorHandler } from '@/utils/error/errorHandler';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useEditChatroom = (chatroomId: string, setError: UseFormSetError<ChatroomFormDataType>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: FormData) => editChatroom(chatroomId, body),
    onSuccess: data => {
      navigate(-1);
      toast.success(data.message);
    },
    onError: createFormErrorHandler(setError),
  });
};

export default useEditChatroom;
