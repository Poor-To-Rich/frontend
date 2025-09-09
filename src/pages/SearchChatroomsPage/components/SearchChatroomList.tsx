import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useSearchChatrooms from '@/hooks/apis/chat/useSearchChatrooms';

interface Props {
  submittedKeyword: string;
}

const SearchChatroomList = ({ submittedKeyword }: Props) => {
  const { data: searchChatrooms, isPending } = useSearchChatrooms(submittedKeyword);

  if (isPending && submittedKeyword) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
      {!searchChatrooms || searchChatrooms.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-defaultGrey">
          {submittedKeyword && '검색된 채팅방이 없습니다'}
        </div>
      ) : (
        <ul className="flex flex-col gap-3.5">
          {searchChatrooms.map(chatroom => (
            <li key={chatroom.chatroomId}>
              <PublicChatroomItem {...chatroom} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchChatroomList;
