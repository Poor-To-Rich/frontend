import { UserProfileType } from './profileType';

export type BaseNoticeType = {
  noticeId: number;
  preview: string;
};

export type NoticeItemType = BaseNoticeType & {
  createdAt: string;
  authorNickname: string;
};

export type RecentNoticeStatus = 'DEFAULT' | 'TEMP_HIDDEN' | 'PERMANENT_HIDDEN';

export type RecentNoticeType = {
  status: RecentNoticeStatus;
  noticeId: number;
  preview: string;
  createdAt: string;
  authorNickname: string;
};

export type updateRecentNoticeReq = {
  status: RecentNoticeStatus;
};

export type RecentNoticeListRes = {
  notices: BaseNoticeType[];
};

export type AllNoticeListRes = {
  hasNext: boolean;
  nextCursor: number;
  notices: NoticeItemType[];
};

export type GetNoticeRes = {
  noticeId: number;
  content: string;
  createdAt: string;
  author: UserProfileType;
};

export type AddEditNoticeReq = {
  content: string;
};

export type AddEditNoticeRes = {
  noticeId: string;
};
