import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { JoinedChatroomType } from '@/types/chatTypes';
import { useQueryClient } from '@tanstack/react-query';

const useHandleUpdateJoinedChatroom = () => {
  const queryClient = useQueryClient();

  return (updatedChatroom: JoinedChatroomType) => {
    queryClient.setQueryData<JoinedChatroomType[]>(joinedChatroomsQueryKey, oldData => {
      if (!oldData) {
        return [updatedChatroom];
      }

      const filtered = oldData.filter(chatroom => chatroom.chatroomId !== updatedChatroom.chatroomId);

      return [updatedChatroom, ...filtered];
    });
  };
};

export default useHandleUpdateJoinedChatroom;
