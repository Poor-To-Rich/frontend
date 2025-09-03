import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { JoinedChatroomsRes, JoinedChatroomType } from '@/types/chatTypes';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

const useHandleUpdateJoinedChatroom = () => {
  const queryClient = useQueryClient();

  return (updatedChatroom: JoinedChatroomType) => {
    queryClient.setQueryData(joinedChatroomsQueryKey, (oldData: InfiniteData<JoinedChatroomsRes> | undefined) => {
      if (!oldData) return oldData;

      if (!updatedChatroom.unreadMessageCount || updatedChatroom.unreadMessageCount <= 0) {
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            chatrooms: page.chatrooms.map(chatroom =>
              chatroom.chatroomId === updatedChatroom.chatroomId ? updatedChatroom : chatroom,
            ),
          })),
        };
      }

      if (updatedChatroom.unreadMessageCount > 0) {
        return {
          ...oldData,
          pages: oldData.pages.map((page, idx) => {
            const filtered = page.chatrooms.filter(chatroom => chatroom.chatroomId !== updatedChatroom.chatroomId);

            if (idx === 0) {
              return {
                ...page,
                chatrooms: [updatedChatroom, ...filtered],
              };
            }

            return {
              ...page,
              chatrooms: filtered,
            };
          }),
        };
      }
    });
  };
};

export default useHandleUpdateJoinedChatroom;
