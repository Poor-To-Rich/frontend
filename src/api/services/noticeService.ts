import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { RecentNoticeListRes, RecentNoticeType, updateRecentNoticeReq } from '@/types/noticeType';

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
