import { getHostedChatrooms } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetHostedChatrooms = () => {
  return useQuery({
    queryKey: ['hostedChatrooms'],
    queryFn: getHostedChatrooms,
  });
};

export default useGetHostedChatrooms;
