import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import useGetHostedChatrooms from '@/hooks/apis/chat/useGetHostedChatrooms';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const HostedChatroomList = () => {
  const { data: hostedChatrooms, isPending } = useGetHostedChatrooms();

  if (isPending) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3.5 p-5">
      {hostedChatrooms?.map(chatroom => <PublicChatroomItem {...chatroom} isEditMode />)}
    </div>
  );
};

export default HostedChatroomList;
