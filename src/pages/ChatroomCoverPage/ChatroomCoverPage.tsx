import ChatActionButton from '@/components/button/ChatActionButton';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import ChatroomInfoItem from '@/pages/ChatroomCoverPage/components/ChatroomInfoItem';
import ChatroomSummary from '@/pages/ChatroomCoverPage/components/ChatroomSummary';
import CoverProfilePhoto from '@/pages/ChatroomCoverPage/components/CoverProfilePhoto';
import PasswordVerifyModal from '@/pages/ChatroomCoverPage/components/modal/PasswordVerifyModal';
import DefaultHeader from '@/components/header/DefaultHeader';
import ModalDimmed from '@/components/modal/ModalDimmed';
import UserProfile from '@/components/profile/UserProfile';
import useEnterChatroom from '@/hooks/apis/chat/useEnterChatroom';
import useGetChatroomCover from '@/hooks/apis/chat/useGetChatroomCover';
import useModal from '@/hooks/useModal';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import useGetChatroomLikeStatus from '@/hooks/apis/chat/useGetChatroomLikeStatus';

const ChatroomCoverPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const { data: chatroomCover } = useGetChatroomCover(chatroomId!);
  const { data: likeStatus } = useGetChatroomLikeStatus(chatroomId!);
  const { mutate: enterChatroom, isPending: isEnterPending } = useEnterChatroom(chatroomId!);

  const handleEnterChatroom = () => {
    if (chatroomCover?.hasPassword) {
      openModal();
    } else {
      enterChatroom({ chatroomPassword: null });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} />
      {chatroomCover && likeStatus ? (
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <CoverProfilePhoto photo={chatroomCover.chatroomImage} />
            <div className="flex flex-col gap-7 p-5">
              <ChatroomSummary
                chatroomTitle={chatroomCover.chatroomTitle}
                currentMemberCount={chatroomCover.currentMemberCount}
                maxMemberCount={chatroomCover.maxMemberCount}
                createdAt={format(chatroomCover.createdAt, 'yyyy.MM.dd')}
                isLiked={likeStatus.isLiked}
                likeCount={likeStatus.likeCount}
              />
              <UserProfile chatroomId="1" userProfile={chatroomCover.hostProfile} hideRanking />
              <div className="flex flex-col gap-5">
                <ChatroomInfoItem label="채팅방 소개" content={chatroomCover.description} />
                <ChatroomInfoItem
                  label="해시태그"
                  content={chatroomCover.hashtags?.map(tag => `#${tag}`).join(' ') ?? ''}
                />
              </div>
            </div>
          </div>
          <div className="p-5 mt-10">
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
