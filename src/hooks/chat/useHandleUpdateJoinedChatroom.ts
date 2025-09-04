import { joinedChatroomsQueryKey } from '@/constants/queryKeys';
import { JoinedChatroomsRes, JoinedChatroomType } from '@/types/chatTypes';
import { ChatroomUpdatedType } from '@/types/messageType';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

const useHandleUpdateJoinedChatroom = () => {
  const queryClient = useQueryClient();

  return (type: ChatroomUpdatedType, updatedChatroom: JoinedChatroomType) => {
    queryClient.setQueryData(joinedChatroomsQueryKey, (oldData: InfiniteData<JoinedChatroomsRes> | undefined) => {
      if (!oldData) return oldData;

      if (type === 'CHATROOM_INFO_UPDATED') {
        return {
          ...oldData,
          pages: oldData.pages.map(page => {
            // 1) 같은 방 찾아서 업데이트
            const updated = page.chatrooms.map(chatroom =>
              chatroom.chatroomId === updatedChatroom.chatroomId ? updatedChatroom : chatroom,
            );

            return {
              ...page,
              chatrooms: updated,
            };
          }),
        };
      }

      if (type === 'CHATROOM_MESSAGE_UPDATED') {
        return {
          ...oldData,
          pages: oldData.pages.map((page, idx) => {
            // 1) 기존에 같은 방 제거
            const filtered = page.chatrooms.filter(chatroom => chatroom.chatroomId !== updatedChatroom.chatroomId);

            if (idx === 0) {
              // 2) 첫 번째 페이지에 updatedChatroom 넣기
              const updatedPage = {
                ...page,
                chatrooms: [updatedChatroom, ...filtered],
              };

              // 3) lastMessageTime 기준 정렬 (내림차순: 최신 먼저)
              updatedPage.chatrooms.sort(
                (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime(),
              );

              return updatedPage;
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
