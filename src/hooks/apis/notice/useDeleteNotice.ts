import { deleteNotice } from '@/api/services/noticeService';
import { AllNoticeListRes, NoticeItemType } from '@/types/noticeType';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteNotice = (chatroomId: string, noticeId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteNotice(chatroomId, noticeId),
    onSuccess: () => {
      navigate(-1);

      queryClient.setQueryData(['allNoticeList', chatroomId], (oldData: InfiniteData<AllNoticeListRes>) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: AllNoticeListRes) => ({
            ...page,
            notices: page.notices.filter((notice: NoticeItemType) => notice.noticeId !== noticeId),
          })),
        };
      });
    },
  });
};

export default useDeleteNotice;
