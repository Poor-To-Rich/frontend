import { deleteNotice } from '@/api/services/noticeService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteNotice = (chatroomId: string, noticeId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteNotice(chatroomId, noticeId),
    onSuccess: () => {
      navigate(-1);
    },
  });
};

export default useDeleteNotice;
