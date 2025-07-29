export type BaseNoticeType = {
  noticeId: number;
  preview: string;
};

export type NoticeItemType = BaseNoticeType & {
  createdAt: string;
  authorNickname: string;
};
