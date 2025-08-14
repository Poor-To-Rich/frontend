import ChatroomFields from '@/components/input/chatroom/ChatroomFields';
import PrimaryButton from '@/components/button/PrimaryButton';

interface Props {
  isPending?: boolean;
  disabled?: boolean;
  onSubmit: () => void;
}

const ChatroomFormContent = ({ isPending, disabled, onSubmit }: Props) => {
  return (
    <form className="flex flex-col justify-between grow px-5 pt-15 pb-8" onSubmit={onSubmit}>
      <ChatroomFields />
      <div className="w-full flex justify-end">
        <PrimaryButton label="저장" isPending={isPending} disabled={disabled} />
      </div>
    </form>
  );
};

export default ChatroomFormContent;
