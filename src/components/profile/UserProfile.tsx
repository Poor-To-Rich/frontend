import ProfilePhoto from '@/components/photo/ProfilePhoto';
import CrownIcon from '@/components/icon/CrownIcon';
import useModal from '@/hooks/useModal';
import UserProfileModal from '@/pages/ChatroomPage/components/modal/UserProfileModal';
import { UserProfileType } from '@/types/profileType';

interface Props {
  userProfile: UserProfileType;
  chatroomId: string;
  createAt?: string;
  hideRanking?: boolean;
}

const UserProfile = ({ userProfile, chatroomId, createAt, hideRanking }: Props) => {
  const { profileImage, rankingType, nickname, isHost } = userProfile;
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className={'flex gap-5 items-center'}>
      <ProfilePhoto
        photo={profileImage}
        rankingType={rankingType}
        hideRanking={hideRanking}
        className="w-20"
        onClick={openModal}
      />
      <div className="flex flex-col items-start gap-1.5">
        <div className="flex items-center gap-2 ">
          <p>{nickname}</p>
          {isHost && <CrownIcon size={20} />}
        </div>
        {createAt && <p className="text-sm text-defaultGrey">{createAt}</p>}
      </div>
      {isOpen && <UserProfileModal chatroomId={chatroomId} userProfile={userProfile} closeModal={closeModal} />}
    </div>
  );
};

export default UserProfile;
