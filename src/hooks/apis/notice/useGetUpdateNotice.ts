import { updateNotice } from '@/api/services/noticeService';
import { AddEditNoticeReq } from '@/types/noticeType';
import { useMutation } from '@tanstack/react-query';

const useGetUpdateNotice = (chatroomId: string, noticeId: string) => {
  return useMutation({
    mutationFn: (body: AddEditNoticeReq) => updateNotice(chatroomId, noticeId, body),
  });
};

export default useGetUpdateNotice;
