import ChatMessage from '@/components/chatroom/chat/ChatMessage';
import CrownIcon from '@/components/icon/CrownIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { ChatMessageType } from '@/types/messageType';
import { UserProfileType } from '@/types/profileType';
import clsx from 'clsx';

interface Props {
  messages: ChatMessageType[];
  isMine: boolean;
  userProfile: UserProfileType;
}
const ChatMessageGroup = ({ messages, isMine, userProfile }: Props) => {
  const [first, ...rest] = messages;

  return (
    <div className="flex flex-col w-full">
      {!isMine && userProfile && (
        <div className="flex gap-5 items-start">
          <ProfilePhoto
            photo={userProfile.profileImage}
            rankingType={userProfile.rankingType}
            className="w-20"
            onClick={() => console.log(userProfile.userId)}
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
    </div>
  );
};

export default ChatMessageGroup;
