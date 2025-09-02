import { kickUser } from '@/api/services/chatService';
import { AllChatroomMembersRes } from '@/types/chatTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useKickUser = (chatroomId: string, closeKickUserModal: () => void, closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => kickUser(chatroomId, userId),
    onSuccess: data => {
      queryClient.setQueryData(['allChatroomMembers', chatroomId], (oldData: AllChatroomMembersRes | undefined) => {
        if (!oldData) return oldData;

        const filtered = oldData.members.filter(member => member.userId !== data?.kickUserId);

        return {
          memberCount: oldData.memberCount - 1,
          members: filtered,
        };
      });

      closeKickUserModal();
      closeModal();
    },
  });
};
