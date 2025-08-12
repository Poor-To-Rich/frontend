import { getChatroomDetails } from '@/api/services/chatService';
import { useQuery } from '@tanstack/react-query';

const useGetChatroomDetails = (chatroomId: string) => {
  return useQuery({
    queryKey: ['chatroomDetails', chatroomId],
    queryFn: () => getChatroomDetails(chatroomId),
  });
};

export default useGetChatroomDetails;
