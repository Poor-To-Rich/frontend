import { format } from 'date-fns';
import CoverProfilePhoto from './CoverProfilePhoto';
import ChatroomSummary from './ChatroomSummary';
import ChatroomInfoItem from './ChatroomInfoItem';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetChatroomCover from '@/hooks/apis/chat/useGetChatroomCover';
import ChatActionButton from '@/components/button/ChatActionButton';
import useEnterChatroom from '@/hooks/apis/chat/useEnterChatroom';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useModal from '@/hooks/useModal';
import PasswordVerifyModal from '@/pages/ChatroomCoverPage/components/modal/PasswordVerifyModal';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';

interface Props {
  chatroomId?: string;
}

const ChatroomCoverContainer = ({ chatroomId }: Props) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const { data: chatroomCover, isLoading: isCoverLoading } = useGetChatroomCover(chatroomId!);
  const { mutate: enterChatroom, isPending: isEnterPending } = useEnterChatroom(chatroomId!);

  const handleEnterChatroom = () => {
    if (chatroomCover?.isJoined) {
      navigate(`/chat/chatroom/${chatroomId}`);
    } else {
      if (chatroomCover?.hasPassword) {
        openModal();
      } else {
        enterChatroom({ chatroomPassword: null });
      }
    }
  };

  if (!chatroomCover || isCoverLoading || !chatroomId) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow justify-between">
      <div>
        <CoverProfilePhoto photo={chatroomCover.chatroomImage} />
        <div className="flex flex-col gap-7 p-5">
          <ChatroomSummary
            chatroomId={chatroomId}
            chatroomTitle={chatroomCover.chatroomTitle}
            currentMemberCount={chatroomCover.currentMemberCount}
            maxMemberCount={chatroomCover.maxMemberCount}
            createdAt={format(chatroomCover.createdAt, 'yyyy.MM.dd')}
          />

          <UserProfile chatroomId={chatroomId} userProfile={chatroomCover.hostProfile} hideRanking hideProfileModal />

          <div className="flex flex-col gap-5">
            <ChatroomInfoItem label="채팅방 소개" content={chatroomCover.description} />
            <ChatroomInfoItem
              label="해시태그"
              content={chatroomCover.hashtags?.map(tag => `#${tag}`).join(' ') ?? ''}
            />
          </div>
        </div>
      </div>
      <div className={clsx(isIOSPWA && 'pb-10', 'p-5 mt-10')}>
        <ChatActionButton
          label={chatroomCover.isJoined ? '참여중인 채팅방' : '채팅 참여하기'}
          hasPassword={chatroomCover.hasPassword}
          onClick={handleEnterChatroom}
          isPending={isEnterPending}
        />
      </div>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <PasswordVerifyModal closeModal={closeModal} />
        </ModalDimmed>
      )}
    </div>
  );
};

export default ChatroomCoverContainer;
