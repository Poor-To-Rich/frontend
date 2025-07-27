import { groupChatMessages } from '@/utils/chat/groupMessages';
import { ChatMessageUnion } from '@/types/messageType';
import SystemMessage from '@/components/chatroom/chat/SystemMessage';
import ChatMessageGroup from '@/components/chatroom/chat/ChatMessageGroup';
import { UserProfileType } from '@/types/profileType';
import RankingMessage from '@/components/chatroom/chat/RankingMessage';
import RankingStatusMessage from '@/components/chatroom/chat/RankingStatusMessage';

interface Props {
  messages: ChatMessageUnion[];
  myUserId: number;
  users: Record<string, UserProfileType>;
}

const ChatBody = ({ messages, myUserId, users }: Props) => {
  const groupedMessages = groupChatMessages(messages);

  return (
    <div className="flex flex-col items-center gap-10 p-5">
      {groupedMessages.map(group => {
        if (group.type === 'GROUP') {
          const user = users[group.senderId];
          return (
            <ChatMessageGroup
              key={group.messages[0].messageId}
              messages={group.messages}
              isMine={group.senderId === myUserId}
              userProfile={user}
            />
          );
        }

        if (group.type === 'SYSTEM_MESSAGE') {
          return <SystemMessage key={group.message.messageId} {...group.message} />;
        }

        if (group.type === 'RANKING_MESSAGE') {
          return <RankingMessage key={group.message.messageId} {...group.message} />;
        }

        if (group.type === 'RANKING_STATUS_MESSAGE') {
          return <RankingStatusMessage key={group.message.messageId} {...group.message} />;
        }

        return null;
      })}
    </div>
  );
};

export default ChatBody;
