import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  AllChatroomsRes,
  ChatroomSortParam,
  JoinedChatroomsRes,
  leaveMultipleChatroomsReq,
  leaveMultipleChatroomsRes,
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
