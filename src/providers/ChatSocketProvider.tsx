import { ReactNode, useEffect } from 'react';
import { ensureActive, stompClient } from '@/api/stomp';

export default function ChatSocketProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureActive();
    return () => {
      setTimeout(() => {
        stompClient.deactivate();
      }, 50);
    };
  }, []);

  return <>{children}</>;
}
