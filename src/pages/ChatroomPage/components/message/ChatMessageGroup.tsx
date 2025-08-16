import ChatMessage from '@/pages/ChatroomPage/components/message/ChatMessage';
import CrownIcon from '@/components/icon/CrownIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { ChatMessageType } from '@/types/messageType';
import { UserProfileType } from '@/types/profileType';
import useModal from '@/hooks/useModal';
import UserProfileModal from '@/pages/ChatroomPage/components/modal/UserProfileModal';
import clsx from 'clsx';

interface Props {
  chatroomId: string;
  messages: ChatMessageType[];
  isMine: boolean;
  userProfile: UserProfileType;
}
const ChatMessageGroup = ({ chatroomId, messages, isMine, userProfile }: Props) => {
  const [first, ...rest] = messages;
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex flex-col w-full">
      {!isMine && userProfile && (
        <div className="flex gap-5 items-start">
          <ProfilePhoto
            photo={userProfile.profileImage}
            rankingType={userProfile.rankingType}
            className="w-20 h-20 shrink-0 self-start cursor-pointer"
            onClick={() => openModal()}
          />
          <div className="flex flex-col items-start gap-1.5">
            <div className="flex items-center gap-2">
              <p>{userProfile.nickname}</p>
              {userProfile.isHost && <CrownIcon size={20} />}
            </div>
            <ChatMessage
              key={first.messageId}
              index={0}
              message={first}
              isMine={false}
              rankingType={userProfile.rankingType}
              showTime={messages.length === 1}
            />
          </div>
        </div>
      )}

      <div className={clsx('flex flex-col gap-3 mt-3', !isMine && 'pl-25')}>
        {isMine
          ? messages.map((msg, index) => (
              <ChatMessage
                key={msg.messageId}
                index={index}
                message={msg}
                isMine
                rankingType={userProfile?.rankingType}
                showTime={index === messages.length - 1}
              />
            ))
          : rest.map((msg, index) => (
              <ChatMessage
                key={msg.messageId}
                index={index + 1}
                message={msg}
                isMine={false}
                rankingType={userProfile?.rankingType}
                showTime={index + 1 === messages.length - 1}
              />
            ))}
      </div>

      {isOpen && <UserProfileModal chatroomId={chatroomId} userProfile={userProfile} closeModal={closeModal} />}
    </div>
  );
};

export default ChatMessageGroup;
