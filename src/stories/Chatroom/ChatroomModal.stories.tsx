import type { Meta, StoryObj } from '@storybook/react';
import PasswordVerifyModal from '@/pages/ChatroomCoverPage/components/modal/PasswordVerifyModal';
import ConsentModal from '@/components/modal/chat/ConsentModal';
import { getHostTransferNotice, HOST_LEAVE_CHATROOM_NOTICE, MEMBER_LEAVE_CHATROOM_NOTICE } from '@/constants/modal';
import DefaultModal from '@/components/modal/DefaultModal';
import ReportReasonModal from '@/components/modal/chat/ReportReasonModal';
import RankingInfoModal from '@/components/modal/chat/RankingInfoModal';

function ChatroomModal() {
  return (
    <div className="w-[500px] min-h-screen flex flex-col items-center gap-4 p-4 relative bg-strokeGray">
      <PasswordVerifyModal />
      <DefaultModal content={MEMBER_LEAVE_CHATROOM_NOTICE} leftButtonLabel="나가기" rightButtonLabel="취소" />
      <ConsentModal content={HOST_LEAVE_CHATROOM_NOTICE} leftButtonLabel="나가기" rightButtonLabel="취소" />
      <ConsentModal content={getHostTransferNotice('데굴')} leftButtonLabel="나가기" rightButtonLabel="취소" />
      <ReportReasonModal />
      <RankingInfoModal />
    </div>
  );
}

const meta = {
  title: 'Chatroom/ChatroomModal',
  component: ChatroomModal,
} satisfies Meta<typeof ChatroomModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
