import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { AllNoticeListRes, RecentNoticeListRes, RecentNoticeType, updateRecentNoticeReq } from '@/types/noticeType';

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
