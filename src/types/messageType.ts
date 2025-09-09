import { BaseRankingType } from '@/types/rankingType';
import { UserProfileType } from '@/types/profileType';

export type ChatMessageUnion = ChatMessageType | SystemMessageType | RankingMessageType | RankingStatusMessageType;

export type BaseChatMessage = {
  type: 'CHAT_MESSAGE';
  messageId: number;
  chatroomId: number;
  content: string;
  senderId: number;
  sentAt: string;
  unreadBy: number[];
};

export type TextChatMessage = BaseChatMessage & {
  messageType: 'TEXT';
};

export type PhotoChatMessage = BaseChatMessage & {
  messageType: 'PHOTO';
  photoId: number;
};

export type ChatMessageType = TextChatMessage | PhotoChatMessage;

export type SystemMessageCategory = 'ENTER' | 'LEAVE' | 'DELEGATE' | 'KICK' | 'DATE' | 'CLOSE';

export type SystemMessageType = {
  type?: 'SYSTEM_MESSAGE';
  userId?: number;
  messageId?: number;
  chatroomId?: number;
  messageType?: SystemMessageCategory;
  content: string;
  sentAt?: string;
};

export type RankingType = 'SAVER' | 'FLEXER' | 'NONE';

export type RankingMessageType = {
  type: 'RANKING_MESSAGE';
  messageId: number;
  chatroomId: number;
  sentAt: string;
} & BaseRankingType;

export type RankingStatusMessageType = {
  type: 'RANKING_STATUS';
  messageId: number;
  chatroomId: number;
  isRankingEnabled: boolean;
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

export type ChatroomUpdatedType = 'CHATROOM_MESSAGE_UPDATED' | 'CHATROOM_INFO_UPDATED';
