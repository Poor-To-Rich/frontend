import ChatroomField from '@/components/input/chatroom/ChatroomField';
import PrimaryButton from '@/components/button/PrimaryButton';

interface Props {
  onSubmit?: (e: React.FormEvent) => void;
}

const ChatroomFormContent = ({ onSubmit }: Props) => {
  return (
    <form className="flex flex-col justify-between grow px-5 pt-15 pb-8" onSubmit={onSubmit}>
      <ChatroomField />
      <div className="w-full flex justify-end">
        <PrimaryButton label="저장" />
      </div>
    </form>
  );
};

export default ChatroomFormContent;
