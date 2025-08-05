import { ChatroomSchema } from '@/schemas/chatSchema';
import { z } from 'zod';

export type ChatroomViewModeValue = 'all' | 'joined';

export type ChatroomSortOptionValue = 'popularity' | 'createdAt' | 'likes';

export type ChatroomSortParam = 'LIKE' | 'CREATED_AT' | 'POPULARITY';

export type PublicChatroomType = {
  chatroomId: number;
  chatroomImage: string;
  chatroomTitle: string;
  description: string;
  hashtags?: string[];
  currentMemberCount: number;
  maxMemberCount: number;
  lastMessageTime: string;
};

export type JoinedChatroomType = {
  chatroomId: number;
  chatroomImage: string;
  chatroomTitle: string;
  currentMemberCount: number;
  lastMessageTime: string;
  lastMessage?: string;
  isHost: boolean;
  unreadMessageCount?: number | string;
};

export type AllChatroomsRes = {
  nextCursor: string;
  hasNext: boolean;
  chatrooms: PublicChatroomType[];
};

export type JoinedChatroomsRes = {
  nextCursor: string;
  hasNext: boolean;
  chatrooms: JoinedChatroomType[];
};

export type leaveMultipleChatroomsReq = {
  chatroomsToLeave: number[];
};

export type leaveMultipleChatroomsRes = {
  deletedChatroomIds: number[];
};

export type SearchChatroomsRes = {
  chatrooms: PublicChatroomType[];
};

export type HostedChatroomsRes = {
  chatrooms: PublicChatroomType[];
};

export type ChatroomFormDataType = z.infer<typeof ChatroomSchema>;

export type AddChatroomRes = {
  newChatroomId: number;
};

export type EditChatroomRes = {
  chatroomId: number;
};

export type LeaveChatroomRes = {
  deletedChatroomId: number;
};
