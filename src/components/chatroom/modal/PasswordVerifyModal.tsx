import ModalDimmed from '@/components/modal/ModalDimmed';
import PasswordActionBox from '../input/PasswordActionBox';
import XIconButton from '@/components/button/icon/XIconButton';

interface Props {
  isPending?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

const PasswordVerifyModal = ({ onClose, ...rest }: Props) => {
  return (
    <ModalDimmed onClose={onClose}>
      <div
        className="relative min-w-[63%] w-fit p-10 aspect-[2/1] flex flex-col justify-evenly items-center gap-6 rounded-lg bg-white"
        onClick={e => e.stopPropagation()}
        {...rest}>
        <XIconButton className="absolute top-5 left-5" />
        <p className="text-center text-md whitespace-pre-line">{'비밀번호를 입력해주세요.'}</p>
        <PasswordActionBox />
      </div>
    </ModalDimmed>
  );
};

export default PasswordVerifyModal;
