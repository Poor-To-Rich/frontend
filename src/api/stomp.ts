import { tokenManager } from '@/utils/tokenManager';
import { Client } from '@stomp/stompjs';

export const stompClient = new Client({
  brokerURL: `wss://${import.meta.env.VITE_API_BASE_URL}/chat-websocket`,
  connectHeaders: {
    Authorization: `Bearer ${tokenManager.getToken()}`,
  },
  debug: str => {
    if (str === '\n' || str.trim() === '') {
      console.log('%c💓 Heartbeat', 'color: #ff69b4');
      return;
    }

    if (str.startsWith('>>>')) {
      console.log('%c📤 Outgoing', 'color: #1e90ff', str);
      return;
    }

    if (str.startsWith('<<<')) {
      if (str.includes('MESSAGE')) {
        console.log('%c📩 Message Received', 'color: #32cd32', str);
      } else {
        console.log('%cℹ️ System Event', 'color: #ffa500', str);
      }
      return;
    }

    console.log('%c🔧 Debug', 'color: gray', str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,
});
