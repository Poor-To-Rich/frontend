import CategoryEditButton from '@/components/button/icon/CategoryEditButton';
import MinusCircleButton from '@/components/button/icon/MinusCircleButton';
import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import ModalButton from '@/components/button/modal/ModalButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import TransactionTypeToggle from '@/components/button/toggle/TransactionTypeToggle';
import SubActionButton from '@/components/button/SubActionButton';
import type { Meta, StoryObj } from '@storybook/react';
import IncomeExpenseToggle from '@/components/button/toggle/IncomeExpenseToggle';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import ToggleSwitch from '@/components/button/toggle/ToggleSwitch';
import CategoryLinkButton from '@/components/button/icon/CategoryLinkButton';
import SignButton from '@/components/button/SignButton';
import ChatActionButton from '@/components/button/ChatActionButton';
import ModalActionButton from '@/components/button/modal/ModalActionButton';
import UtilityButton from '@/components/button/UtilityButton';
import NoticeOptionButton from '@/components/button/NoticeOptionButton';
import ChatroomViewModeToggle from '@/components/button/toggle/ChatroomViewModeToggle';
import ChatroomSortOptions from '@/components/button/ChatroomSortOptions';
import MyHostedChatroomsButton from '@/components/button/icon/MyHostedChatroomsButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';
import ChatroomSearchButton from '@/components/button/icon/ChatroomSearchButton';
import LikeButton from '@/components/button/icon/LikeButton';
import PostMoreButton from '@/components/button/icon/PostMoreButton';
import ChatroomMenuButton from '@/components/button/icon/ChatroomMenuButton';
import HelpTooltipButton from '@/components/button/icon/HelpTooltipButton';
import ImageUploadButton from '@/components/button/icon/ImageUploadButton';
import ShareButton from '@/components/button/icon/ShareButton';
import GlobalChatroomDropDown from '@/components/menu/GlobalChatroomDropDown';
import SingleChatroomDropdown from '@/components/menu/SingleChatroomDropdown';
import NoticeDropdown from '@/components/menu/NoticeDropdown';

function Button() {
  return (
    <div className="flex flex-col gap-5 relative">
      <h2> PrimaryButton </h2>
      <div className="flex gap-3">
        <PrimaryButton label="회원가입" />
      </div>

      <br />
      <h2> ModalButton </h2>
      <div className="flex gap-3">
        <ModalButton label="예" />
        <ModalButton label="아니요" />
      </div>

      <div className="flex flex-col gap-3 w-3/5">
        <ModalActionButton label="나중에 설치하기" />
        <ModalActionButton label="확인" />
      </div>

      <h2> SignButton </h2>
      <div className="flex flex-col gap-3 w-3/5">
        <SignButton label="로그인" />
        <SignButton label="회원가입" />
        <SignButton label="아이디로 로그인" />
        <SignButton label="카카오로 로그인" />
      </div>

      <br />
      <h2> ChatActionButton </h2>
      <div className="flex flex-col gap-3 w-4/5">
        <ChatActionButton label="채팅 참여하기" />
        <ChatActionButton label="채팅 참여하기" hasPassword />
        <ChatActionButton label="참여중인 채팅방" />
        <ChatActionButton label="참여중인 채팅방" hasPassword />
        <ChatActionButton label="채팅방 나가기" />
        <ChatActionButton label="채팅방 나가기" disabled />
        <ChatActionButton label="채팅방 삭제 및 나가기" />
      </div>

      <br />
      <h2>지출, 수입 버튼</h2>
      <IncomeExpenseToggle type="지출" onClick={() => {}} />
      <TransactionTypeToggle />

      <br />
      <h2>SubActionButton</h2>
      <SubActionButton label="인증" />
      <SubActionButton label="확인" />
      <SubActionButton label="중복확인" />
      <SubActionButton label="위임" />
      <SubActionButton label="검색" />
      <SubActionButton label="전송" />

      <br />
      <h2>UtilityButton</h2>
      <UtilityButton label="내보내기" />
      <UtilityButton label="신고하기" />
      <UtilityButton label="커버보기" />
      <UtilityButton label="프로필 편집" />

      <br />
      <h2>NoticeOptionButton</h2>
      <div className="flex w-full gap-5 px-5">
        <NoticeOptionButton label="다시 열지 않음" />
        <NoticeOptionButton label="접어두기" />
      </div>

      <br />
      <h2>ChatroomViewModeToggle</h2>
      <ChatroomViewModeToggle viewMode="all" onClick={() => {}} />

      <br />
      <h2>ChatroomSortOptions</h2>
      <ChatroomSortOptions sortOption="createdAt" onClick={() => {}} />

      <br />
      <h2>DropdownMenu</h2>
      <GlobalChatroomDropDown viewMode="all" closeMenu={() => {}} openModal={() => {}} />
      <SingleChatroomDropdown chatroomId="1" isHost openModal={() => {}} />
      <NoticeDropdown />

      <br />
      <h2>아이콘 버튼</h2>
      <PlusCircleButton />
      <RepeatCircleButton openModal={() => {}} />
      <ToggleSwitch id={'1'} visibility type={'지출'} />
      <CategoryLinkButton type="지출" />
      <MinusCircleButton onClick={() => {}} />
      <CategoryEditButton id={1} />
      <div className="flex gap-3">
        <ChatroomSearchButton />
        <MyHostedChatroomsButton />
        <ChatroomSettingsButton />
      </div>
      <LikeButton />
      <PostMoreButton />
      <ChatroomMenuButton />
      <HelpTooltipButton />
      <ImageUploadButton />
      <ShareButton />
    </div>
  );
}

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
