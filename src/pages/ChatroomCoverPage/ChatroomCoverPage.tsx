import ChatActionButton from '@/components/button/ChatActionButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import ChatroomInfoItem from '@/components/chatroom/cover/ChatroomInfoItem';
import ChatroomSummary from '@/components/chatroom/cover/ChatroomSummary';
import CoverProfilePhoto from '@/components/chatroom/cover/CoverProfilePhoto';
import PasswordVerifyModal from '@/components/chatroom/modal/PasswordVerifyModal';
import DefaultHeader from '@/components/header/DefaultHeader';
import ModalDimmed from '@/components/modal/ModalDimmed';
import UserProfile from '@/components/profile/UserProfile';
import useEnterChatroom from '@/hooks/apis/chat/useEnterChatroom';
import useGetChatroomCover from '@/hooks/apis/chat/useGetChatroomCover';
import useModal from '@/hooks/useModal';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

const ChatroomCoverPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const { data: chatroomCover } = useGetChatroomCover(chatroomId!);
  const { mutate: enterChatroom, isPending: isEnterPending } = useEnterChatroom(chatroomId!);

  const handleEnterChatroom = () => {
    if (chatroomCover?.hasPassword) {
      openModal();
    } else {
      enterChatroom(undefined);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      {chatroomCover ? (
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <CoverProfilePhoto photo={chatroomCover.chatroomImage} />
            <div className="flex flex-col gap-7 p-5">
              <ChatroomSummary
                chatroomTitle={chatroomCover.chatroomTitle}
                currentMemberCount={chatroomCover.currentMemberCount}
                maxMemberCount={chatroomCover.maxMemberCount}
                createdAt={format(chatroomCover.createdAt, 'yyyy.MM.dd')}
                likeCount={0}
              />
              <UserProfile {...chatroomCover.hostProfile} hideRanking />
              <div className="flex flex-col gap-3.5">
                <ChatroomInfoItem label="채팅방 소개" content={chatroomCover.description} />
                <ChatroomInfoItem
                  label="해시태그"
                  content={chatroomCover.hashtags?.map(tag => `#${tag}`).join(' ') ?? ''}
                />
              </div>
            </div>
          </div>
          <div className="p-5">
            <ChatActionButton
              label={chatroomCover.isJoined ? '참여중인 채팅방' : '채팅 참여하기'}
              hasPassword={chatroomCover.hasPassword}
              onClick={handleEnterChatroom}
              isPending={isEnterPending}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <PasswordVerifyModal closeModal={closeModal} />
        </ModalDimmed>
      )}
    </div>
  );
};

export default ChatroomCoverPage;
