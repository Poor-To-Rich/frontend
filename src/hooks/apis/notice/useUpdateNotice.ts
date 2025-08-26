import { updateNotice } from '@/api/services/noticeService';
import { AddEditNoticeReq } from '@/types/noticeType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUpdateNotice = (chatroomId: string, noticeId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddEditNoticeReq) => updateNotice(chatroomId, noticeId, body),
    onSuccess: () => {
      navigate(-1);
      queryClient.refetchQueries({ queryKey: ['allNoticeList', chatroomId] });
    },
  });
};

export default useUpdateNotice;
