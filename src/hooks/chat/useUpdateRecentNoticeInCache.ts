import { RecentNoticeType } from '@/types/noticeType';
import { useQueryClient } from '@tanstack/react-query';

const useUpdateRecentNoticeInCache = () => {
  const queryClient = useQueryClient();

  return (chatroomId: string, newNotice: RecentNoticeType) => {
    queryClient.setQueryData(['recentNotice', chatroomId], (oldData: RecentNoticeType | undefined) => {
      if (!oldData) {
        return newNotice;
      }
      return {
        ...oldData,
        ...newNotice,
      };
    });
  };
};

export default useUpdateRecentNoticeInCache;
