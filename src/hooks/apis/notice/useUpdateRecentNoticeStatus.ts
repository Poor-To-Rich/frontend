import { updateRecentNoticeStatus } from '@/api/services/noticeService';
import { RecentNoticeType, updateRecentNoticeReq } from '@/types/noticeType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateRecentNoticeStatus = (chatroomId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: updateRecentNoticeReq) => updateRecentNoticeStatus(chatroomId, body),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<RecentNoticeType>(['recentNotice', chatroomId], prev => {
        if (!prev) return prev;

        return {
          ...prev,
          status: variables.status,
        };
      });
    },
  });
};

export default useUpdateRecentNoticeStatus;
