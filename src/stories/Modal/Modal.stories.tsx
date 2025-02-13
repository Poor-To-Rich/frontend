import DefaultModal from '@/components/modal/DefaultModal';
import IterationCycleModal from '@/components/modal/IterationCycleModal';
import useModal from '@/hooks/useModal';
import type { Meta, StoryObj } from '@storybook/react';

function Modal() {
  const { isOpen: isModal, openModal: openModalClick, closeModal: closeModalClick } = useModal();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button onClick={openModalClick}>Default 모달</button>
      {isModal && <DefaultModal content="“냠냠” 카테고리를 삭제하시겠습니까?" onClose={closeModalClick} />}
      <button onClick={openModal}>RepeatSchedule 모달</button>
      {isOpen && <IterationCycleModal onClose={closeModal} iterationType="매일" />}
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
