import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import ModalButton from '@/components/button/ModalButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import ReportTypeButton from '@/components/button/ReportTypeButton';
import SignButton from '@/components/button/SignButton';
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
      <div>
        <IncomeExpenseButton label="지출" isClicked />
        <IncomeExpenseButton label="수입" />
      </div>
      <div>
        <IncomeExpenseButton label="지출" />
        <IncomeExpenseButton label="수입" isClicked />
      </div>
      <div>
        <ReportTypeButton />
      </div>
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
