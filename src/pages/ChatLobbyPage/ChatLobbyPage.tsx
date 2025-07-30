import ChatroomSortOptions from '@/components/button/ChatroomSortOptions';
import ChatroomSearchButton from '@/components/button/icon/ChatroomSearchButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';
import MyHostedChatroomsButton from '@/components/button/icon/MyHostedChatroomsButton';
import PlusButton from '@/components/button/icon/PlusButton';
import ChatroomViewModeToggle from '@/components/button/toggle/ChatroomViewModeToggle';
import DefaultHeader from '@/components/header/DefaultHeader';
import TapBar from '@/components/tapbar/TapBar';
import { ChatroomSortOptionValue, ChatroomViewModeValue } from '@/types/chatTypes';
import { useRef, useState } from 'react';
import AllChatroomsList from '@/pages/ChatLobbyPage/components/AllChatroomsList';
import JoinedChatroomList from '@/pages/ChatLobbyPage/components/JoinedChatroomList';
import GlobalChatroomDropDown from '@/components/menu/GlobalChatroomDropDown';
import useModal from '@/hooks/useModal';
import RankingInfoModal from '@/components/chatroom/modal/RankingInfoModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useClickOutside from '@/hooks/useClickOutside';

const ChatLobbyPage = () => {
  const [viewMode, setViewMode] = useState<ChatroomViewModeValue>('all');
  const [sortOption, setSortOption] = useState<ChatroomSortOptionValue>('popularity');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModal();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({
    refs: [dropdownRef, settingsButtonRef],
    onClickOutside: () => setIsMenuOpen(false),
  });

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader label="지갑 봉합소" rightButton={<PlusButton />} />
      <div className="flex-grow p-5">
        <div className="flex justify-between relative">
          <ChatroomViewModeToggle viewMode={viewMode} onClick={(value: ChatroomViewModeValue) => setViewMode(value)} />
          <div className="flex gap-3">
            <ChatroomSearchButton />
            <MyHostedChatroomsButton />
            <ChatroomSettingsButton
              isMenuOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(prev => !prev)}
              ref={settingsButtonRef}
            />
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 top-15" ref={dropdownRef}>
              <GlobalChatroomDropDown
                viewMode={viewMode}
                closeMenu={() => setIsMenuOpen(false)}
                openModal={openModal}
              />
            </div>
          )}
        </div>
        {viewMode === 'all' ? (
          <>
            <ChatroomSortOptions
              sortOption={sortOption}
              onClick={(value: ChatroomSortOptionValue) => setSortOption(value)}
            />
            <AllChatroomsList sortOption={sortOption} />
          </>
        ) : (
          <JoinedChatroomList />
        )}
      </div>
      {isOpen && (
        <ModalDimmed onClose={closeModal}>
          <RankingInfoModal closeModal={closeModal} />
        </ModalDimmed>
      )}
      <TapBar page="chat" />
    </div>
  );
};

export default ChatLobbyPage;
