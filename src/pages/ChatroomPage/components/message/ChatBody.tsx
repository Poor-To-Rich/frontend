import { groupChatMessages } from '@/utils/chat/groupMessages';
import { ChatMessageUnion } from '@/types/messageType';
import SystemMessage from '@/pages/ChatroomPage/components/message/SystemMessage';
import ChatMessageGroup from '@/pages/ChatroomPage/components/message/ChatMessageGroup';
import { UserProfileType } from '@/types/profileType';
import RankingMessage from '@/pages/ChatroomPage/components/message/RankingMessage';
import RankingStatusMessage from '@/pages/ChatroomPage/components/message/RankingStatusMessage';

interface Props {
  chatroomId: string;
  messages: ChatMessageUnion[];
  myUserId: number;
  users: Record<string, UserProfileType>;
}

const ChatBody = ({ chatroomId, messages, myUserId, users }: Props) => {
  const groupedMessages = groupChatMessages(messages);

  return (
    <div className="flex flex-col items-center gap-10 p-5 w-full">
      {groupedMessages.map(group => {
        if (group.type === 'GROUP') {
          const user = users[group.senderId];
          return (
            <ChatMessageGroup
              key={group.messages[0].messageId}
              chatroomId={chatroomId}
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

        if (group.type === 'RANKING_STATUS') {
          return <RankingStatusMessage key={group.message.messageId} {...group.message} />;
        }

        return null;
      })}
    </div>
  );
};

export default ChatBody;
