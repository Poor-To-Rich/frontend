import PasswordActionBox from '../input/PasswordActionBox';
import XIconButton from '@/components/button/icon/XIconButton';

interface Props {
  closeModal: () => void;
}

const PasswordVerifyModal = ({ closeModal }: Props) => {
  return (
    <div
      className="relative min-w-[63%] w-fit p-10 aspect-[2/1] flex flex-col justify-evenly items-center gap-6 rounded-lg bg-white"
      onClick={e => e.stopPropagation()}>
      <XIconButton className="absolute top-5 left-5" onClick={closeModal} />
      <p className="text-center text-md whitespace-pre-line">{'비밀번호를 입력해주세요.'}</p>
      <PasswordActionBox />
    </div>
  );
};

export default PasswordVerifyModal;
