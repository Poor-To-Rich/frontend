import XIconButton from '@/components/button/icon/XIconButton';
import UtilityButton from '@/components/button/UtilityButton';
import Divider from '@/components/Divider';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { ChatroomUserRoleRes } from '@/types/chatTypes';
import { UserProfileType } from '@/types/profileType';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  chatroomId: string;
  userProfile: UserProfileType;
  closeModal: () => void;
}
const UserProfileModal = ({ chatroomId, userProfile, closeModal }: Props) => {
  const queryClient = useQueryClient();
  const userRole = queryClient.getQueryData(['chatroomUserRole', chatroomId]) as ChatroomUserRoleRes;

  return (
    <div className="fixed inset-0 z-10 flex items-stretch justify-center">
      <div className="w-[500px] h-full flex justify-center items-end bg-defaultGrey relative">
        <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeModal} />
        <div className="w-full flex flex-col items-center gap-15">
          <div className="text-center">
            <ProfilePhoto
              photo={userProfile.profileImage}
              rankingType={userProfile.rankingType}
              className="w-30 h-30 sm:w-40 sm:h-40 shrink-0 self"
            />
            <p className="text-white">{userProfile.nickname}</p>
          </div>
          <Divider weight={1.5} />
          <div className="flex gap-5 mb-30">
            {userRole.chatroomRole === 'HOST' && <UtilityButton label="내보내기" />}
            <UtilityButton label="신고하기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
