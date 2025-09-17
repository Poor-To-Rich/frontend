import {
  ChatMessageType,
  ChatMessageUnion,
  RankingMessageType,
  SystemMessageType,
  RankingStatusMessageType,
} from '@/types/messageType';

type GroupedMessage =
  | { type: 'GROUP'; senderId: number; minuteKey: string; messages: ChatMessageType[] }
  | { type: 'SYSTEM_MESSAGE'; message: SystemMessageType }
  | { type: 'RANKING_MESSAGE'; message: RankingMessageType }
  | { type: 'RANKING_STATUS'; message: RankingStatusMessageType };

function minuteKeyOf(ts: string | number | Date) {
  const d = new Date(ts);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const HH = String(d.getHours()).padStart(2, '0');
  const MM = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}`;
}

export function groupChatMessages(messages: ChatMessageUnion[], latestReadMessageId?: string | null): GroupedMessage[] {
  const result: GroupedMessage[] = [];
  let buffer: ChatMessageType[] = [];
  let bufferSenderId: number | null = null;
  let bufferMinuteKey: string | null = null;

  const flushBuffer = () => {
    if (buffer.length === 0) return;
    result.push({
      type: 'GROUP',
      senderId: bufferSenderId!,
      minuteKey: bufferMinuteKey!,
      messages: buffer,
    });
    buffer = [];
    bufferSenderId = null;
    bufferMinuteKey = null;
  };

  const addReadMessage = (messageId: number | undefined, latestReadMessageId?: string | null) => {
    if (!messageId) return;
    if (latestReadMessageId && messageId === Number(latestReadMessageId)) {
      flushBuffer();
      result.push({ type: 'SYSTEM_MESSAGE', message: { content: '여기까지 읽으셨습니다.' } });
    }
  };

  for (const message of messages) {
    if (message.type === 'CHAT_MESSAGE') {
      const msg = message as ChatMessageType;
      const mk = minuteKeyOf(msg.sentAt);

      if (buffer.length === 0) {
        buffer = [msg];
        bufferSenderId = msg.senderId;
        bufferMinuteKey = mk;

        addReadMessage(message.messageId, latestReadMessageId);

        continue;
      }

      if (bufferSenderId === msg.senderId && bufferMinuteKey === mk) {
        buffer.push(msg);
      } else {
        flushBuffer();
        buffer = [msg];
        bufferSenderId = msg.senderId;
        bufferMinuteKey = mk;
      }

      addReadMessage(message.messageId, latestReadMessageId);
    } else {
      flushBuffer();

      if (message.type === 'SYSTEM_MESSAGE') {
        result.push({ type: 'SYSTEM_MESSAGE', message: message as SystemMessageType });
      } else if (message.type === 'RANKING_MESSAGE') {
        result.push({ type: 'RANKING_MESSAGE', message: message as RankingMessageType });
      } else if (message.type === 'RANKING_STATUS') {
        result.push({ type: 'RANKING_STATUS', message: message as RankingStatusMessageType });
      }

      addReadMessage(message.messageId, latestReadMessageId);
    }
  }

  flushBuffer();
  return result;
}
