import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  AddChatroomRes,
  AllChatroomsRes,
  ChatroomCoverType,
  ChatroomFormDataType,
  ChatroomSortParam,
  ChatroomIdRes,
  HostedChatroomsRes,
  JoinedChatroomsRes,
  LeaveChatroomRes,
  leaveMultipleChatroomsReq,
  leaveMultipleChatroomsRes,
  SearchChatroomsRes,
  EnterChatroomReq,
  LikeStatusRes,
  LikedStatusReq,
  ChatroomDetailsRes,
  ChatroomUserRoleRes,
  KickUserRes,
  ReportChatroomMemberReq,
  ReportChatroomMemberRes,
  AllChatroomMembersRes,
  SearchChatroomMembers,
  DelegateChatroomHostReq,
  DelegateChatroomHostRes,
} from '@/types/chatTypes';
import { ChatRoomMessageRes } from '@/types/messageType';

export const getAllChatrooms = async (sortBy: ChatroomSortParam, cursor?: string | null) => {
  const res = await fetchData<undefined, AllChatroomsRes>('GET', endpoints.chat.getAllChatrooms(sortBy, cursor));
  if (!res.data) throw new Error('No Data');
  return res.data;
};

export const getJoinedChatrooms = async (cursor?: string | null) => {
  const res = await fetchData<undefined, JoinedChatroomsRes>('GET', endpoints.chat.getJoinedChatrooms(cursor));
  if (!res.data) throw new Error('No Data');
  return res.data;
};

export const markAllChatroomsAsRead = async () => {
  const res = await fetchData<undefined, undefined>('PATCH', endpoints.chat.markAllAsRead);
  return res.data;
};

export const leaveMultipleChatrooms = async (body: leaveMultipleChatroomsReq) => {
  const res = await fetchData<leaveMultipleChatroomsReq, leaveMultipleChatroomsRes>(
    'DELETE',
    endpoints.chat.leaveMultipleChatrooms,
    body,
  );
  return res.data;
};

export const searchChatrooms = async (keyword: string) => {
  const res = await fetchData<undefined, SearchChatroomsRes>('GET', endpoints.chat.searchChatrooms(keyword));
  return res.data?.chatrooms;
};

export const getHostedChatrooms = async () => {
  const res = await fetchData<undefined, HostedChatroomsRes>('GET', endpoints.chat.getHostedChatrooms);
  return res.data?.chatrooms;
};

export const addChatroom = async (body: FormData) => {
  const res = await fetchData<FormData, AddChatroomRes>('POST', endpoints.chat.addChatroom, body);
  return res.data?.newChatroomId;
};

export const getChatroom = async (chatroomId: string) => {
  const res = await fetchData<undefined, ChatroomFormDataType>('GET', endpoints.chat.getChatroom(chatroomId));
  return res.data;
};

export const editChatroom = async (chatroomId: string, body: FormData) => {
  const res = await fetchData<FormData, ChatroomIdRes>('PUT', endpoints.chat.editChatroom(chatroomId), body);
  return res;
};

export const leaveChatroom = async (chatroomId: string) => {
  const res = await fetchData<undefined, LeaveChatroomRes>('DELETE', endpoints.chat.leaveChatroom(chatroomId));
  return res.data;
};

export const getChatroomCover = async (chatroomId: string) => {
  const res = await fetchData<undefined, ChatroomCoverType>('GET', endpoints.chat.getChatroomCover(chatroomId));
  return res.data;
};

export const enterChatroom = async (chatroomId: string, body?: EnterChatroomReq) => {
  const res = await fetchData<EnterChatroomReq, ChatroomIdRes>('POST', endpoints.chat.enterChatroom(chatroomId), body);
  return res.data;
};

export const getChatroomLikeStatus = async (chatroomId: string) => {
  const res = await fetchData<undefined, LikeStatusRes>('GET', endpoints.chat.getChatroomLikeStatus(chatroomId));
  return res.data;
};

export const toggleChatroomLike = async (chatroomId: string, body: LikedStatusReq) => {
  const res = await fetchData<LikedStatusReq, LikeStatusRes>(
    'PATCH',
    endpoints.chat.toggleChatroomLike(chatroomId),
    body,
  );
  return res.data;
};

export const getChatroomMessage = async (chatroomId: string, cursor?: number | null) => {
  const res = await fetchData<undefined, ChatRoomMessageRes>(
    'GET',
    endpoints.chat.getChatroomMessages(chatroomId, cursor),
  );
  if (!res.data) throw new Error('No Data');
  return res.data;
};

export const getChatroomDetails = async (chatroomId: string) => {
  const res = await fetchData<undefined, ChatroomDetailsRes>('GET', endpoints.chat.getChatroomDetails(chatroomId));
  return res.data;
};

export const getChatroomUserRole = async (chatroomId: string) => {
  const res = await fetchData<undefined, ChatroomUserRoleRes>('GET', endpoints.chat.getChatroomUserRole(chatroomId));
  return res.data;
};

export const kickUser = async (chatroomId: string, userId: number) => {
  const res = await fetchData<undefined, KickUserRes>('DELETE', endpoints.chat.kickUser(chatroomId, userId));
  return res.data;
};

export const kickUserMessageRead = async (chatroomId: string) => {
  const res = await fetchData<undefined>('DELETE', endpoints.chat.kickUserReadMessage(chatroomId));
  return res.data;
};

export const reportChatroomMember = async (chatroomId: string, userId: number, body: ReportChatroomMemberReq) => {
  const res = await fetchData<ReportChatroomMemberReq, ReportChatroomMemberRes>(
    'POST',
    endpoints.chat.reportChatroomMember(chatroomId, userId),
    body,
  );
  return res;
};

export const getAllChatroomMembers = async (chatroomId: string) => {
  const res = await fetchData<undefined, AllChatroomMembersRes>(
    'GET',
    endpoints.chat.getAllChatroomMembers(chatroomId),
  );
  return res.data;
};

export const searchChatroomMembers = async (chatroomId: string, nickname: string) => {
  const res = await fetchData<undefined, SearchChatroomMembers>(
    'GET',
    endpoints.chat.searchChatroomMembers(chatroomId, nickname),
  );
  return res.data;
};

export const delegateChatroomHost = async (chatroomId: string, body: DelegateChatroomHostReq) => {
  const res = await fetchData<DelegateChatroomHostReq, DelegateChatroomHostRes>(
    'PATCH',
    endpoints.chat.delegateChatroomHost(chatroomId),
    body,
  );
  return res;
};
