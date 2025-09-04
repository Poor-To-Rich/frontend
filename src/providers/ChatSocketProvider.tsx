import { ReactNode, useEffect } from 'react';
import { ensureActive, stompClient, addOnConnect } from '@/api/stomp';
import { StompSubscription } from '@stomp/stompjs';
import useGetUserDetails from '@/hooks/apis/auth/useGetUserDetails';
import useHandleUpdateJoinedChatroom from '@/hooks/chat/useHandleUpdateJoinedChatroom';
import { useQueryClient } from '@tanstack/react-query';
import { joinedChatroomsQueryKey } from '@/constants/queryKeys';

export default function ChatSocketProvider({ children }: { children: ReactNode }) {
  const { data: userDetail } = useGetUserDetails();
  const queryClient = useQueryClient();
  const handleUpdatedJoinedChatroom = useHandleUpdateJoinedChatroom();

  useEffect(() => {
    ensureActive();
    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
      queryClient.removeQueries({ queryKey: joinedChatroomsQueryKey });
    };
  }, []);

  useEffect(() => {
    if (!userDetail?.userId) return;

    let sub: StompSubscription | undefined;

    const subscribe = () => {
      sub = stompClient.subscribe(`/sub/chat/summary/${userDetail.userId}`, res => {
        const response = JSON.parse(res.body);
        console.log(response);
        handleUpdatedJoinedChatroom(response.type, response.payload);
      });
    };

    if (stompClient.connected) subscribe();
    const off = addOnConnect(subscribe);

    return () => {
      off();
      sub?.unsubscribe();
    };
  }, [userDetail?.userId, handleUpdatedJoinedChatroom]);

  return <>{children}</>;
}
