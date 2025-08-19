import { getNotice } from '@/api/services/noticeService';
import { useQuery } from '@tanstack/react-query';

const useGetNotice = (chatroomId: string, noticeId: string) => {
  return useQuery({
    queryKey: ['noticeDetail', chatroomId, noticeId],
    queryFn: () => getNotice(chatroomId, noticeId),
  });
};

export default useGetNotice;
