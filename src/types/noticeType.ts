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
