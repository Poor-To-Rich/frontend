import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { RecentNoticeType, updateRecentNoticeReq } from '@/types/noticeType';

export const getRecentNotice = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentNoticeType>('GET', endpoints.notice.getRecentNotice(chatroomId));
  return res.data;
};

export const updateRecentNoticeStatus = async (chatroomId: string, body: updateRecentNoticeReq) => {
  const res = await fetchData<updateRecentNoticeReq, undefined>(
    'PATCH',
    endpoints.notice.updateRecentNoticeStatus(chatroomId),
    body,
  );
  return res.data;
};
