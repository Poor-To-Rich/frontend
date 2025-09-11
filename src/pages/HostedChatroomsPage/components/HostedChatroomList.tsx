import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import useGetHostedChatrooms from '@/hooks/apis/chat/useGetHostedChatrooms';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import clsx from 'clsx';
import { isIOSPWA } from '@/utils/deviceUtils';

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
    <>
      {hostedChatrooms?.length === 0 ? (
        <div className="flex flex-grow items-center justify-center text-defaultGrey">나의 채팅방이 없습니다.</div>
      ) : (
        <ul className={clsx(isIOSPWA && 'pb-10', 'w-full flex flex-col gap-3.5 p-5')}>
          {hostedChatrooms?.map(chatroom => (
            <li key={chatroom.chatroomId}>
              <PublicChatroomItem {...chatroom} isEditMode />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HostedChatroomList;
