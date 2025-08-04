import HelpIcon from '@/components/icon/HelpIcon';
import useModal from '@/hooks/useModal';
import ModalDimmed from '../../modal/ModalDimmed';
import RankingInfoModal from '../../chatroom/modal/RankingInfoModal';

const RankingCheckBox = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="w-full flex justify-between">
        <label className="relative flex items-center cursor-pointer" onClick={openModal}>
          <span>랭킹기능</span>
          <span className="text-sunsetRose absolute -top-2 -right-7">
            <HelpIcon size={16} />
          </span>
        </label>
        <div className="flex justify-start w-3/5">
          <label className="relative cursor-pointer">
            <input type="checkbox" className="hidden peer" {...props} />
            <div className="w-[2.6rem] h-[2.6rem] border border-strokeGray rounded-md peer-checked:border-pastelLime peer-checked:bg-pastelLime" />
          </label>
        </div>
      </div>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <RankingInfoModal closeModal={closeModal} />
        </ModalDimmed>
      )}
    </>
  );
};

export default RankingCheckBox;
