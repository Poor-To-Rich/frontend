import { getRecentRanking } from '@/api/services/rankingService';
import { useQuery } from '@tanstack/react-query';

const useGetRecentRanking = (chatroomId: string) => {
  return useQuery({
    queryKey: ['recentRanking', chatroomId],
    queryFn: () => getRecentRanking(chatroomId),
  });
};

export default useGetRecentRanking;
