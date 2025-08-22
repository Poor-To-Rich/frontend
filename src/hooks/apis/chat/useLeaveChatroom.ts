import { leaveChatroom } from '@/api/services/chatService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLeaveChatroom = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: leaveChatroom,
    onSuccess: () => navigate('/chat'),
  });
};

export default useLeaveChatroom;
