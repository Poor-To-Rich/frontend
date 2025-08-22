import SubActionButton from '@/components/button/SubActionButton';
import ConsentModal from '@/components/modal/chat/ConsentModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import UserProfile from '@/components/profile/UserProfile';
import { getHostTransferNotice } from '@/constants/modal';
import useDelegateChatroomHost from '@/hooks/apis/chat/useDelegateChatroomHost';
import useModal from '@/hooks/useModal';
import { UserProfileType } from '@/types/profileType';

interface Props {
  chatroomId: string;
  userProfile: UserProfileType;
}

const DelegateUserItem = ({ chatroomId, userProfile }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: delegateHost } = useDelegateChatroomHost(chatroomId);

  const handleClick = () => {
    delegateHost({
      targetUserId: userProfile.userId,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-between">
      <UserProfile chatroomId={chatroomId} userProfile={userProfile} />
      <SubActionButton label="위임" className="py-1.5" onClick={openModal} />
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <ConsentModal
            content={getHostTransferNotice(userProfile.nickname)}
            leftButtonLabel="변경"
            rightButtonLabel="취소"
            onClick={handleClick}
            onClose={closeModal}
          />
        </ModalDimmed>
      )}
    </div>
  );
};

export default DelegateUserItem;
