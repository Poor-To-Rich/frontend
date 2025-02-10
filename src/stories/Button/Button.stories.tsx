import CategoryEditButton from '@/components/button/icon/CategoryEditButton';
import CategoryLinkButton from '@/components/button/icon/CategoryLinkButton';
import MinusCircleButton from '@/components/button/icon/MinusCircleButton';
import PlusCircleButton from '@/components/button/icon/PlusCircleButton';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import ModalButton from '@/components/button/ModalButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import ReportTypeButton from '@/components/button/ReportTypeButton';
import SignButton from '@/components/button/SignButton';
import ToggleSwitch from '@/components/button/ToggleSwitch';
import VerifyButton from '@/components/button/VerifyButton';
import type { Meta, StoryObj } from '@storybook/react';

function Button() {
  return (
    <div className="w-[500px] flex flex-col gap-5">
      <h2> 기본 버튼 </h2>
      <div className="flex gap-3">
        <PrimaryButton label="회원가입" />
        <PrimaryButton label="회원가입" isActive />
      </div>
      <div className="flex gap-3">
        <ModalButton label="예" />
        <ModalButton label="아니요" />
      </div>
      <div className="flex gap-3">
        <SignButton label="로그인" />
        <SignButton label="회원가입" />
      </div>
      <br />
      <h2>지출, 수입 버튼</h2>
      <IncomeExpenseButton />
      <ReportTypeButton />
      <h2>검증 버튼</h2>
      <VerifyButton label="인증" />
      <VerifyButton label="확인" />
      <VerifyButton label="중복확인" />
      <h2>기타 버튼</h2>
      <PlusCircleButton />
      <RepeatCircleButton />
      <ToggleSwitch />
      <CategoryLinkButton />
      <MinusCircleButton />
      <CategoryEditButton />
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
