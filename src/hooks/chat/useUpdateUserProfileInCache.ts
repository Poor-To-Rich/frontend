import { ChatRoomMessageRes } from '@/types/messageType';
import { UserProfileType } from '@/types/profileType';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

const useUpdateUserProfileInCache = () => {
  const queryClient = useQueryClient();

  return (chatroomId: string, newUser: UserProfileType) => {
    queryClient.setQueryData(
      ['chatroomMessages', chatroomId],
      (oldData: InfiniteData<ChatRoomMessageRes> | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            users: {
              ...page.users,
              [newUser.userId]: {
                ...page.users[newUser.userId],
                ...newUser,
              },
            },
          })),
        };
      },
    );
  };
};

export default useUpdateUserProfileInCache;
