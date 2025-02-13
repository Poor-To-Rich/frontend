import DefaultModal from '@/components/modal/DefaultModal';
import type { Meta, StoryObj } from '@storybook/react';

function Modal() {
  return (
    <div>
      <DefaultModal content="“냠냠” 카테고리를 삭제하시겠습니까?" />
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
