import { getRecentNotice } from '@/api/services/noticeService';
import { useQuery } from '@tanstack/react-query';

const useGetRecentNotice = (chatroomId: string) => {
  return useQuery({
    queryKey: ['recentNotice', chatroomId],
    queryFn: () => getRecentNotice(chatroomId),
  });
};

export default useGetRecentNotice;
