import { ChatroomSchema } from '@/schemas/chatSchema';
import { z } from 'zod';
import { UserProfileType } from './profileType';

export type ChatroomViewModeValue = 'all' | 'joined';

export type ChatroomSortOptionValue = 'updatedAt' | 'createdAt' | 'likes';

export type ChatroomSortParam = 'LIKE' | 'CREATED_AT' | 'UPDATED_AT';

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
  latestReadMessageId?: number | null;
  isHost: boolean;
  unreadMessageCount?: number;
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

export type ChatroomIdRes = {
  chatroomId: number;
};

export type LeaveChatroomRes = {
  deleteChatroomId: number;
};

export type ChatroomCoverType = {
  chatroomId: number;
  chatroomImage: string;
  chatroomTitle: string;
  description: string;
  hashtags?: string[];
  currentMemberCount: number;
  maxMemberCount: number;
  createdAt: string;
  isJoined: boolean;
  hasPassword: boolean;
  hostProfile: UserProfileType;
  latestReadMessageId?: number | null;
};

export type EnterChatroomReq = {
  chatroomPassword: string | null;
};

export type LikedStatusReq = {
  isLiked: boolean;
};

export type LikeStatusRes = LikedStatusReq & {
  likeCount: number;
};

export type ChatroomDetailsRes = {
  chatroomImage: string;
  chatroomTitle: string;
  isRankingEnabled: boolean;
  currentMemberCount: number;
  isClosed: boolean;
};

export type UserRoleType = 'HOST' | 'MEMBER' | 'BANNED';

export type ChatroomUserRoleRes = {
  chatroomRole: UserRoleType;
  userId: number;
};

export type KickUserRes = {
  kickUserId: number;
};

export type ReportReasonType = 'INSULT' | 'SEXUAL' | 'SPAM' | 'FLOOD' | 'POLITICAL' | 'CUSTOM';

export type ReportChatroomMemberReq = {
  reportReason: ReportReasonType;
  customReason?: string;
};

export type ReportChatroomMemberRes = {
  reportedUserId: number;
  chatroomId: number;
  reportReason: ReportReasonType;
};

export type AllChatroomMembersRes = {
  memberCount: number;
  members: UserProfileType[];
};

export type SearchChatroomMembers = {
  members: UserProfileType[];
};

export type DelegateChatroomHostReq = {
  targetUserId: number;
};

export type DelegateChatroomHostRes = {
  newHostUserId: number;
};
