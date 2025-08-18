import { reportChatroomMember } from '@/api/services/chatService';
import { ReportChatroomMemberReq } from '@/types/chatTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useReportChatroomMember = (chatroomId: string, userId: number, closeReportModal: () => void) => {
  return useMutation({
    mutationFn: (body: ReportChatroomMemberReq) => reportChatroomMember(chatroomId, userId, body),
    onSuccess: data => {
      toast.success(data.message);
      closeReportModal();
    },
  });
};

export default useReportChatroomMember;
