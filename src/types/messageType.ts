import { BaseRankingType } from '@/types/rankingType';
import { UserProfileType } from '@/types/profileType';

export type ChatMessageUnion = ChatMessageType | SystemMessageType | RankingMessageType | RankingStatusMessageType;

export type ChatMessageType = {
  type: 'CHAT_MESSAGE';
  messageId: number;
  chatroomId: number;
  senderId: number;
  messageType: 'TEXT' | 'IMAGE';
  content: string;
  sentAt: string;
  unreadBy: number[];
};

export type SystemMessageCategory = 'ENTER' | 'LEAVE' | 'DELEGATE' | 'DATE' | 'CLOSE';

export type SystemMessageType = {
  type: 'SYSTEM_MESSAGE';
  userId?: number;
  messageId: number;
  chatroomId: number;
  messageType: SystemMessageCategory;
  content: string;
  sentAt: string;
};

export type RankingType = 'SAVER' | 'FLEXER' | 'NONE';

export type RankingMessageType = {
  type: 'RANKING_MESSAGE';
  messageId: number;
  chatroomId: number;
  sentAt: string;
} & BaseRankingType;

export type RankingStatusMessageType = {
  type: 'RANKING_STATUS_MESSAGE';
  messageId: number;
  chatroomId: number;
  isChatEnabled: boolean;
  sentAt: string;
};

export type UsersMap = {
  [userId: string]: UserProfileType;
};

export type ChatRoomMessageRes = {
  nextCursor: number | null;
  hasNext: boolean;
  messages: ChatMessageUnion[];
  users: UsersMap;
};
