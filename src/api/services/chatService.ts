import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  AddChatroomRes,
  AllChatroomsRes,
  ChatroomCoverType,
  ChatroomFormDataType,
  ChatroomSortParam,
  EditChatroomRes,
  HostedChatroomsRes,
  JoinedChatroomsRes,
  LeaveChatroomRes,
  leaveMultipleChatroomsReq,
  leaveMultipleChatroomsRes,
  SearchChatroomsRes,
} from '@/types/chatTypes';

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
  const res = await fetchData<FormData, EditChatroomRes>('PUT', endpoints.chat.editChatroom(chatroomId), body);
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
