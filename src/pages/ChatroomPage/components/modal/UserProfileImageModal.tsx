import XIconButton from '@/components/button/icon/XIconButton';

interface Props {
  closeUserProfileImageModal: () => void;
  profileImage: string;
}

const UserProfileImageModal = ({ closeUserProfileImageModal, profileImage }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center">
      <div className="w-[500px] h-full flex justify-center items-center bg-black relative">
        <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeUserProfileImageModal} />
        <img src={profileImage} alt="유저 프로필 이미지" className="w-full max-h-[80%] object-contain bg-white" />
      </div>
    </div>
  );
};

export default UserProfileImageModal;
