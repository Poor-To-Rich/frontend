import CategoryEditButton from '@/components/button/icon/CategoryEditButton';
import MinusCircleButton from '@/components/button/icon/MinusCircleButton';
import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import ModalButton from '@/components/button/ModalButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import ReportTypeButton from '@/components/button/TransactionTypeButton';
import SignButton from '@/pages/LoginPage/components/SignButton';
import VerifyButton from '@/components/button/VerifyButton';
import type { Meta, StoryObj } from '@storybook/react';
import IncomeExpenseButton from '@/components/button/IncomeExpenseButton';
import RepeatCircleButton from '@/components/button/icon/RepeatCircleButton';
import ToggleSwitch from '@/components/button/ToggleSwitch';
import CategoryLinkButton from '@/components/button/icon/CategoryLinkButton';

function Button() {
  return (
    <div className="flex flex-col gap-5">
      <h2> 기본 버튼 </h2>
      <div className="flex gap-3">
        <PrimaryButton label="회원가입" />
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
      <IncomeExpenseButton type="지출" onClick={() => {}} />
      <ReportTypeButton />
      <h2>검증 버튼</h2>
      <VerifyButton label="인증" />
      <VerifyButton label="확인" />
      <VerifyButton label="중복확인" />
      <h2>기타 버튼</h2>
      <PlusCircleButton />
      <RepeatCircleButton openModal={() => {}} />
      <ToggleSwitch visibility />
      <CategoryLinkButton type="지출" />
      <MinusCircleButton onClick={() => {}} />
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
