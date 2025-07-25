import DefaultModal from '@/components/modal/DefaultModal';
import type { Meta, StoryObj } from '@storybook/react';

function Modal() {
  return (
    <div className="w-[500px] relative">
      <DefaultModal content="“냠냠” 카테고리를 삭제하시겠습니까?" onClose={() => {}} />
    </div>
  );
}

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
