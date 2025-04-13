import ModalDimmed from '@/components/modal/ModalDimmed';
import ModalButton from '@/components/button/ModalButton';

interface Props {
  type: 'delete' | 'edit';
  onClose: () => void;
}

const IterationChangeModal = ({ type, onClose }: Props) => {
  const options = {
    delete: {
      content: '해당 가계부를 삭제하시겠습니까?',
      buttons: [
        {
          label: '이 반복 내역만 삭제 ',
        },
        {
          label: '이후 반복 내역도 삭제',
        },
        {
          label: '모든 반복 내역 삭제',
        },
      ],
    },
    edit: {
      content: '해당 가계부를 편집하시겠습니까?',
      buttons: [
        {
          label: '이후 반복 내역에도 적용',
        },
        {
          label: '모든 반복 내역에 적용',
        },
      ],
    },
  };

  return (
    <ModalDimmed onClose={onClose}>
      <div className="w-[63%]  flex flex-col justify-evenly rounded-lg bg-white" onClick={e => e.stopPropagation()}>
        <span className="text-center py-8 text-md">{options[type].content}</span>
        <div className="flex flex-col items-center justify-center gap-6 pb-8">
          {options[type].buttons.map(({ label }) => (
            <ModalButton label={label} key={label} />
          ))}
        </div>
      </div>
    </ModalDimmed>
  );
};

export default IterationChangeModal;
