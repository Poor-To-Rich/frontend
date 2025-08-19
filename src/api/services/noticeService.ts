import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  AllNoticeListRes,
  RecentNoticeListRes,
  RecentNoticeType,
  AddEditNoticeReq,
  updateRecentNoticeReq,
  AddEditNoticeRes,
  GetNoticeRes,
} from '@/types/noticeType';

export const getRecentNotice = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentNoticeType>('GET', endpoints.notice.getRecentNotice(chatroomId));
  if (!res.data) return null;
  return res.data;
};

export const getRecentNoticeList = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentNoticeListRes>('GET', endpoints.notice.getRecentNoticeList(chatroomId));
  return res.data?.notices;
};

export const updateRecentNoticeStatus = async (chatroomId: string, body: updateRecentNoticeReq) => {
  const res = await fetchData<updateRecentNoticeReq, undefined>(
    'PATCH',
    endpoints.notice.updateRecentNoticeStatus(chatroomId),
    body,
  );
  return res.data;
};

export const getAllNoticeList = async (chatroomId: string, cursor?: number | null) => {
  const res = await fetchData<undefined, AllNoticeListRes>(
    'GET',
    endpoints.notice.getAllNoticeList(chatroomId, cursor),
  );
  if (!res.data) throw new Error('No Data');
  return res.data;
};

export const getNotice = async (chatroomId: string, noticeId: string) => {
  const res = await fetchData<undefined, GetNoticeRes>('GET', endpoints.notice.getNotice(chatroomId, noticeId));
  return res.data;
};

export const updateNotice = async (chatroomId: string, noticeId: string, body: AddEditNoticeReq) => {
  const res = await fetchData<AddEditNoticeReq, AddEditNoticeRes>(
    'PUT',
    endpoints.notice.updateNotice(chatroomId, noticeId),
    body,
  );
  return res.data;
};
