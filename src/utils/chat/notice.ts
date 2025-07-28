export type ChatroomNoticeStatus = 'DEFAULT' | 'TEMP_HIDDEN' | 'PERMANENT_HIDDEN';

export type ChatroomNoticeBanner = {
  noticeId: number;
  status: ChatroomNoticeStatus;
  preview: string;
  createdAt: string;
  authorNickname: string;
};
