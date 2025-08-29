import { deleteNotice } from '@/api/services/noticeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteNotice = (chatroomId: string, noticeId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteNotice(chatroomId, noticeId),
    onSuccess: () => {
      navigate(-1);
      queryClient.refetchQueries({ queryKey: ['allNoticeList', chatroomId] });
    },
  });
};

export default useDeleteNotice;
