import ModalButton from '@/components/button/modal/ModalButton';
import ModalDimmed from '@/components/modal/ModalDimmed';

interface Props {
  content: string;
  isPending?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

const DefaultModal = ({ content, isPending, onClose, onClick, ...rest }: Props) => {
  return (
    <ModalDimmed onClose={onClose}>
      <div
        className="min-w-[63%] w-fit p-10 aspect-[2/1] flex flex-col justify-evenly gap-6 rounded-lg bg-white"
        onClick={e => e.stopPropagation()}
        {...rest}>
        <p className="text-center text-md whitespace-pre-line">{content}</p>
        <div className="flex justify-center gap-4">
          <ModalButton label={'예'} onClick={onClick} isPending={isPending} />
          <ModalButton label={'아니요'} onClick={onClose} />
        </div>
      </div>
    </ModalDimmed>
  );
};

export default DefaultModal;
