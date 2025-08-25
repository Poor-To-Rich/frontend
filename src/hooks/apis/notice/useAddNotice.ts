import { addNotice } from '@/api/services/noticeService';
import { AddEditNoticeReq } from '@/types/noticeType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useAddNotice = (chatroomId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddEditNoticeReq) => addNotice(chatroomId, body),
    onSuccess: data => {
      navigate(`/chat/chatroom/${chatroomId}/notices/${data?.noticeId}`, { replace: true });
      queryClient.refetchQueries({ queryKey: ['allNoticeList', chatroomId] });
    },
  });
};

export default useAddNotice;
