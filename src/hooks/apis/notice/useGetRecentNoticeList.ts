import { getRecentNoticeList } from '@/api/services/noticeService';
import { useQuery } from '@tanstack/react-query';

const useGetRecentNoticeList = (chatroomId: string) => {
  return useQuery({
    queryKey: ['recentNoticeList', chatroomId],
    queryFn: () => getRecentNoticeList(chatroomId),
  });
};

export default useGetRecentNoticeList;
