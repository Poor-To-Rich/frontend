import ModalButton from '@/components/button/modal/ModalButton';

interface Props {
  content: string;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
  isPending?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

const DefaultModal = ({
  content,
  leftButtonLabel = '예',
  rightButtonLabel = '아니요',
  isPending,
  onClose,
  onClick,
  ...rest
}: Props) => {
  return (
    <div
      className="min-w-[63%] w-fit p-10 aspect-[2/1] flex flex-col justify-evenly gap-6 rounded-lg bg-white"
      onClick={e => e.stopPropagation()}
      {...rest}>
      <p className="text-center text-md whitespace-pre-line">{content}</p>
      <div className="flex justify-center gap-4">
        <ModalButton label={leftButtonLabel} onClick={onClick} isPending={isPending} />
        <ModalButton label={rightButtonLabel} onClick={onClose} />
      </div>
    </div>
  );
};

export default DefaultModal;
