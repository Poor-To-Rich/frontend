import { toggleChatroomLike } from '@/api/services/chatService';
import { LikedStatusReq, LikeStatusRes } from '@/types/chatTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useToggleChatroomLikeStatus = (chatroomId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: LikedStatusReq) => toggleChatroomLike(chatroomId, body),
    onMutate: async newLikeStatus => {
      await queryClient.cancelQueries({ queryKey: ['chatroomLikeStatus', chatroomId] });

      const previousData = queryClient.getQueryData<LikeStatusRes>(['chatroomLikeStatus', chatroomId]);

      queryClient.setQueryData(['chatroomLikeStatus', chatroomId], (old: LikeStatusRes) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: newLikeStatus.isLiked,
          likeCount: old.likeCount + (newLikeStatus.isLiked ? 1 : -1),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['chatroomLikeStatus', chatroomId], context.previousData);
      }
      toast.error(_err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chatroomLikeStatus', chatroomId] });
    },
  });
};

export default useToggleChatroomLikeStatus;
