import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  AllChatroomsRes,
  ChatroomSortParam,
  HostedChatroomsRes,
  JoinedChatroomsRes,
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
