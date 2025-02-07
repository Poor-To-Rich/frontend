import ModalButton from '@/components/button/ModalButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import type { Meta, StoryObj } from '@storybook/react';

function Button() {
  return (
    <div className="w-[500px] flex flex-col gap-5">
      <div className="flex gap-3">
        <PrimaryButton label="회원가입" />
        <PrimaryButton label="회원가입" isActive />
      </div>
      <div className="flex gap-3">
        <ModalButton label="예" />
        <ModalButton label="아니요" />
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
