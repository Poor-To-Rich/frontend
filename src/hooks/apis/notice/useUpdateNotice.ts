import { updateNotice } from '@/api/services/noticeService';
import { AddEditNoticeReq } from '@/types/noticeType';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUpdateNotice = (chatroomId: string, noticeId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: AddEditNoticeReq) => updateNotice(chatroomId, noticeId, body),
    onSuccess: () => navigate(-1),
  });
};

export default useUpdateNotice;
