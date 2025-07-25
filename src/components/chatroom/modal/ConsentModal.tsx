import ModalButton from '@/components/button/modal/ModalButton';
import CheckedCircleIcon from '@/components/icon/CheckedCircleIcon';
import DefaultCircleIcon from '@/components/icon/DefaultCircleIcon';
import { useState } from 'react';

interface Props {
  content: string;
  leftButtonLabel: string;
  rightButtonLabel: string;
  isPending?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

const ConsentModal = ({ content, leftButtonLabel, rightButtonLabel, isPending, onClose, onClick, ...rest }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div
      className="min-w-[63%] w-fit p-10 flex flex-col items-center justify-evenly gap-6 rounded-lg bg-white"
      onClick={e => e.stopPropagation()}
      {...rest}>
      <p className="text-center text-md w-fit whitespace-pre-line">{content}</p>
      <div className="flex justify-center items-center gap-2.5">
        <button
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          onClick={() => setIsChecked(prev => !prev)}
          className="flex items-center gap-2 cursor-pointer">
          {isChecked ? <CheckedCircleIcon /> : <DefaultCircleIcon />}
        </button>
        <p className="text-md">위 내용을 모두 확인했습니다.</p>
      </div>
      <div className="flex justify-center gap-4">
        <ModalButton label={leftButtonLabel} onClick={onClick} isPending={isPending} disabled={!isChecked} />
        <ModalButton label={rightButtonLabel} onClick={onClose} />
      </div>
    </div>
  );
};

export default ConsentModal;
