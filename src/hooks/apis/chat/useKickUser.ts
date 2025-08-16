import { kickUser } from '@/api/services/chatService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useKickUser = (chatroomId: string, closeKickUserModal: () => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userId: number) => kickUser(chatroomId, userId),
    onSuccess: () => {
      closeKickUserModal();
      navigate(-1);
    },
  });
};
