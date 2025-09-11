import { createPortal } from 'react-dom';
import XIconButton from '@/components/button/icon/XIconButton';

interface Props {
  closeUserProfileImageModal: () => void;
  profileImage: string;
}

const UserProfileImageModal = ({ closeUserProfileImageModal, profileImage }: Props) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-stretch justify-center ">
      <div className="w-[500px] h-full flex justify-center items-center relative bg-black">
        <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeUserProfileImageModal} />
        <img src={profileImage} alt="유저 프로필 이미지" className="w-full max-h-[80%] object-contain bg-white" />
      </div>
    </div>,
    document.body,
  );
};

export default UserProfileImageModal;
