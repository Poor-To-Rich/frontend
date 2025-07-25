import ChatroomBadge from '@/components/chatroom/cover/ChatroomBadge';

interface Props {
  label: string;
  content: string;
}

const ChatroomInfoItem = ({ label, content }: Props) => {
  return (
    <div className="flex items-start gap-7">
      <ChatroomBadge label={label} />
      <p className="text-md text-defaultGrey pt-1">{content}</p>
    </div>
  );
};

export default ChatroomInfoItem;
