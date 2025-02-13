import ModalButton from '@/components/button/ModalButton';
import ModalDimmed from '@/components/modal/ModalDimmed';

interface Props {
  content: string;
  onClose?: () => void;
}

const DefaultModal = ({ content, onClose }: Props) => {
  return (
    <ModalDimmed onClose={onClose}>
      <div className="w-[63%] aspect-[2/1] flex flex-col justify-evenly rounded-lg bg-white">
        <span className="text-center text-md">{content}</span>
        <div className="flex justify-center gap-4">
          <ModalButton label={'예'} />
          <ModalButton label={'아니요'} onClick={onClose} />
        </div>
      </div>
    </ModalDimmed>
  );
};

export default DefaultModal;
