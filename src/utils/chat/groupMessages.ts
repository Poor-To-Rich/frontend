import {
  ChatMessageType,
  ChatMessageUnion,
  RankingMessageType,
  SystemMessageType,
  RankingStatusMessageType,
} from '@/types/messageType';

type GroupedMessage =
  | { type: 'GROUP'; senderId: number; messages: ChatMessageType[] }
  | { type: 'SYSTEM_MESSAGE'; message: SystemMessageType }
  | { type: 'RANKING_MESSAGE'; message: RankingMessageType }
  | { type: 'RANKING_STATUS_MESSAGE'; message: RankingStatusMessageType };

export function groupChatMessages(messages: ChatMessageUnion[]): GroupedMessage[] {
  const result: GroupedMessage[] = [];
  let buffer: ChatMessageType[] = [];

  for (const message of messages) {
    if (message.type === 'CHAT_MESSAGE') {
      if (buffer.length === 0 || buffer[buffer.length - 1].senderId === message.senderId) {
        buffer.push(message);
      } else {
        result.push({
          type: 'GROUP',
          senderId: buffer[0].senderId,
          messages: buffer,
        });
        buffer = [message];
      }
    } else {
      if (buffer.length > 0) {
        result.push({
          type: 'GROUP',
          senderId: buffer[0].senderId,
          messages: buffer,
        });
        buffer = [];
      }

      if (message.type === 'SYSTEM_MESSAGE') {
        result.push({
          type: 'SYSTEM_MESSAGE',
          message: message as SystemMessageType,
        });
      } else if (message.type === 'RANKING_MESSAGE') {
        result.push({
          type: 'RANKING_MESSAGE',
          message: message as RankingMessageType,
        });
      } else if (message.type === 'RANKING_STATUS_MESSAGE') {
        result.push({
          type: 'RANKING_STATUS_MESSAGE',
          message: message as RankingStatusMessageType,
        });
      }
    }
  }

  if (buffer.length > 0) {
    result.push({
      type: 'GROUP',
      senderId: buffer[0].senderId,
      messages: buffer,
    });
  }

  return result;
}
