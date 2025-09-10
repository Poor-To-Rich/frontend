import { useEffect, useRef } from 'react';
import { addOnConnect, stompClient } from '@/api/stomp';
import { StompSubscription } from '@stomp/stompjs';
import { IMessage } from '@stomp/stompjs';
import { useHandleChatMessage } from '@/hooks/chat/useHandleChatMessage';
import { ChatroomUserRoleRes } from '@/types/chatTypes';

export const useChatroomSubscription = (
  chatroomId: string,
  userRole: ChatroomUserRoleRes | undefined,
  setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  onReadMessage: (userId: number) => void,
) => {
  const didPublishRef = useRef(false);
  const handleMessage = useHandleChatMessage(chatroomId, setIsChatDisabled, onReadMessage, userRole?.userId);

  useEffect(() => {
    if (!chatroomId || !userRole || userRole.chatroomRole === 'BANNED') return;

    let sub: StompSubscription | undefined;

    const subscribe = () => {
      sub = stompClient.subscribe(`/sub/chatroom/${chatroomId}`, (message: IMessage) => {
        handleMessage(message);
      });

      // 구독 직후 읽음 처리 발행
      if (!didPublishRef.current) {
        stompClient.publish({
          destination: `/pub/chat/read`,
          body: JSON.stringify({ chatroomId }),
        });
        didPublishRef.current = true;
      }
    };

    // 1) 이미 연결돼 있으면 즉시 실행
    if (stompClient.connected) subscribe();

    // 2) 연결/재연결 시 실행하도록 리스너 등록
    const off = addOnConnect(subscribe);

    // 언마운트 시 정리
    return () => {
      off();
      sub?.unsubscribe();
    };
  }, [chatroomId, userRole, handleMessage, setIsChatDisabled]);
};
