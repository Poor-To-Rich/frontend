import ChatActionButton from '@/components/button/ChatActionButton';
import ChatroomEditHeader from '@/components/header/ChatroomEditHeader';
import { useNavigate } from 'react-router-dom';
import JoinedChatroomList from '../ChatLobbyPage/components/JoinedChatroomList';
import { useState } from 'react';
import useLeaveMultipleChatrooms from '@/hooks/apis/chat/useLeaveMultipleChatrooms';
import useModal from '@/hooks/useModal';
import ConsentModal from '@/components/chatroom/modal/ConsentModal';
import { HOST_LEAVE_CHATROOM_NOTICE, MEMBER_LEAVE_CHATROOM_NOTICE } from '@/constants/modal';
import ModalDimmed from '@/components/modal/ModalDimmed';

const JoinedChatroomsEditPage = () => {
  const navigate = useNavigate();
  const [selectedChatrooms, setSelectedChatrooms] = useState<{ id: number; isHost: boolean }[]>([]);
  const [hasHostedChatroom, setHasHostedChatroom] = useState<boolean>(false);
  const clearSelectedStatus = () => {
    setSelectedChatrooms([]);
    setHasHostedChatroom(false);
  };
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: leaveMultipleChatrooms, isPending } = useLeaveMultipleChatrooms(clearSelectedStatus, closeModal);

  const handleSelectChatroom = (id: number, isHost: boolean) => {
    setSelectedChatrooms(prev => {
      const isSelected = prev.some(room => room.id === id);
      const nextSelected = isSelected ? prev.filter(room => room.id !== id) : [...prev, { id, isHost }];

      setHasHostedChatroom(nextSelected.some(room => room.isHost));
      return nextSelected;
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <ChatroomEditHeader
        buttonLabel={`${selectedChatrooms.length > 0 ? `${selectedChatrooms.length} ` : ''}선택해제`}
        disabled={selectedChatrooms.length === 0}
        onLeftClick={() => navigate('/chat', { state: { viewMode: 'joined' } })}
        onRightClick={clearSelectedStatus}
      />
      <div className="flex-grow pr-5">
        <JoinedChatroomList
          isEditMode
          selectedChatrooms={selectedChatrooms}
          onClick={(id: number, isHost: boolean) => handleSelectChatroom(id, isHost)}
        />
      </div>
      <div className="p-5 bg-white sticky bottom-0 z-10 border-t border-strokeGray">
        <ChatActionButton label="채팅방 나가기" disabled={selectedChatrooms.length === 0} onClick={openModal} />
      </div>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <ConsentModal
            content={hasHostedChatroom ? HOST_LEAVE_CHATROOM_NOTICE : MEMBER_LEAVE_CHATROOM_NOTICE}
            leftButtonLabel="나가기"
            rightButtonLabel="취소"
            isPending={isPending}
            onClick={() => {
              leaveMultipleChatrooms({
                chatroomsToLeave: selectedChatrooms.map(room => room.id),
              });
            }}
            onClose={closeModal}
          />
        </ModalDimmed>
      )}
    </div>
  );
};

export default JoinedChatroomsEditPage;
