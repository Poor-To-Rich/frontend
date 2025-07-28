import { UserProfileType } from './profileType';

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

export type SystemMessageCategory = 'ENTER' | 'LEAVE' | 'DELEGATE';

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
  rankingId?: number;
  chatroomId: number;
  rankedAt?: string;
  sentAt: string;
  saverRankings: UserProfileType[];
  flexerRankings: UserProfileType[];
};

export type RankingStatusMessageType = {
  type: 'RANKING_STATUS_MESSAGE';
  messageId: number;
  chatroomId: number;
  isChatEnabled: boolean;
  sentAt: string;
};
