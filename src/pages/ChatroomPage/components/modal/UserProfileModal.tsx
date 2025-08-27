import XIconButton from '@/components/button/icon/XIconButton';
import UtilityButton from '@/components/button/UtilityButton';
import Divider from '@/components/Divider';
import DefaultModal from '@/components/modal/DefaultModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { useKickUser } from '@/hooks/apis/chat/useKickUser';
import useModal from '@/hooks/useModal';
import { UserProfileType } from '@/types/profileType';
import UserProfileImageModal from '@/pages/ChatroomPage/components/modal/UserProfileImageModal';
import useReportChatroomMember from '@/hooks/apis/chat/useReportChatroomMember';
import ReportReasonModal from '@/pages/ChatroomPage/components/modal/ReportReasonModal';
import useGetChatroomUserRole from '@/hooks/apis/chat/useGetChatroomUserRole';

interface Props {
  chatroomId: string;
  userProfile: UserProfileType;
  closeModal: () => void;
}

const UserProfileModal = ({ chatroomId, userProfile, closeModal }: Props) => {
  const { data: userRole } = useGetChatroomUserRole(chatroomId);
  const {
    isOpen: isUserProfileImageModal,
    openModal: openUserProfileImageModal,
    closeModal: closeUserProfileImageModal,
  } = useModal();
  const { isOpen: isKickUserModal, openModal: openKickUserModal, closeModal: closeKickUserModal } = useModal();
  const { isOpen: isReportModal, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  const { mutate: kickUser } = useKickUser(chatroomId, closeKickUserModal);
  const { mutate: reportChatroomMember } = useReportChatroomMember(chatroomId, userProfile.userId, closeReportModal);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center">
      <div className="w-[500px] h-full flex justify-center items-end bg-defaultGrey relative">
        <XIconButton color="white" size={28} className="absolute top-3 left-3" onClick={closeModal} />
        <div className="w-full flex flex-col items-center gap-15">
          <div className="text-center">
            <ProfilePhoto
              photo={userProfile.profileImage}
              rankingType={userProfile.rankingType}
              className="w-30 h-30 sm:w-40 sm:h-40 shrink-0 cursor-pointer"
              onClick={openUserProfileImageModal}
            />
            <p className="text-white">{userProfile.nickname}</p>
          </div>
          <Divider weight={1.5} />
          <div className="flex gap-5 mb-30">
            {userRole?.chatroomRole === 'HOST' && <UtilityButton label="내보내기" onClick={openKickUserModal} />}
            <UtilityButton label="신고하기" onClick={openReportModal} />
          </div>
        </div>
      </div>
      {isUserProfileImageModal && (
        <UserProfileImageModal
          closeUserProfileImageModal={closeUserProfileImageModal}
          profileImage={userProfile.profileImage}
        />
      )}
      {isKickUserModal && (
        <ModalDimmed onClose={closeKickUserModal}>
          <DefaultModal
            content={`상대방을 내보내고 이 채팅방에 \n 더 이상 참여하지 못하게 합니다.`}
            onClick={() => kickUser(userProfile.userId)}
            onClose={closeKickUserModal}
          />
        </ModalDimmed>
      )}
      {isReportModal && (
        <ModalDimmed onClose={closeReportModal}>
          <ReportReasonModal handleSubmit={reportChatroomMember} closeModal={closeReportModal} />
        </ModalDimmed>
      )}
    </div>
  );
};

export default UserProfileModal;
