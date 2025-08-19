import { tokenManager } from '@/utils/tokenManager';
import { Client } from '@stomp/stompjs';

export const stompClient = new Client({
  brokerURL: `wss://${import.meta.env.VITE_API_BASE_URL}/chat-websocket`,
  connectHeaders: {},
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
  reconnectDelay: 1000,
  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,

  beforeConnect: () => {
    const token = tokenManager.getToken();
    stompClient.connectHeaders = {
      Authorization: `Bearer ${token}`,
    };
  },
  onWebSocketClose: evt => {
    console.warn('[WebSocket closed]', 'code:', evt.code, 'reason:', evt.reason || '(no reason)');
  },
});

const connectListeners = new Set<() => void>();
stompClient.onConnect = () => connectListeners.forEach(fn => fn());

export function addOnConnect(fn: () => void) {
  connectListeners.add(fn);
  return () => connectListeners.delete(fn);
}

export function ensureActive() {
  if (!stompClient.active) {
    stompClient.connectHeaders = {
      Authorization: `Bearer ${tokenManager.getToken()}`,
    };
    stompClient.activate();
  }
}
