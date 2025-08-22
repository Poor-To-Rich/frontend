import ChatroomSortOptions from '@/components/button/ChatroomSortOptions';
import ChatroomSearchButton from '@/components/button/icon/ChatroomSearchButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';
import MyHostedChatroomsButton from '@/components/button/icon/MyHostedChatroomsButton';
import PlusButton from '@/components/button/icon/PlusButton';
import ChatroomViewModeToggle from '@/components/button/toggle/ChatroomViewModeToggle';
import DefaultHeader from '@/components/header/DefaultHeader';
import TapBar from '@/components/tapbar/TapBar';
import { ChatroomSortOptionValue, ChatroomViewModeValue } from '@/types/chatTypes';
import { useEffect, useRef, useState } from 'react';
import AllChatroomsList from '@/pages/ChatLobbyPage/components/AllChatroomsList';
import JoinedChatroomList from '@/components/chatroom/JoinedChatroomList';
import GlobalChatroomDropDown from '@/components/menu/GlobalChatroomDropDown';
import useModal from '@/hooks/useModal';
import RankingInfoModal from '@/components/modal/chat/RankingInfoModal';
import ModalDimmed from '@/components/modal/ModalDimmed';
import useClickOutside from '@/hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';

const ChatLobbyPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ChatroomViewModeValue>('all');
  const [sortOption, setSortOption] = useState<ChatroomSortOptionValue>('updatedAt');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModal();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const scrollPositions = useRef<{ all: number; joined: number }>({ all: 0, joined: 0 });

  useClickOutside({
    refs: [dropdownRef, settingsButtonRef],
    onClickOutside: () => setIsMenuOpen(false),
  });

  const handleViewModeChange = (next: ChatroomViewModeValue) => {
    scrollPositions.current[viewMode] = window.scrollY;
    setViewMode(next);
    sessionStorage.setItem('viewMode', next);
  };

  const handleSortOptionChange = (next: ChatroomSortOptionValue) => {
    setSortOption(next);
    sessionStorage.setItem('sortOption', next);
  };

  useEffect(() => {
    const storageViewMode = sessionStorage.getItem('viewMode') ?? 'all';
    const storageSortOption = sessionStorage.getItem('sortOption') ?? 'updatedAt';
    setViewMode(storageViewMode as ChatroomViewModeValue);
    setSortOption(storageSortOption as ChatroomSortOptionValue);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositions.current[viewMode]);
    });
  }, [viewMode]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader label="지갑 봉합소" rightButton={<PlusButton onClick={() => navigate('/chat/chatroom/add')} />} />
      <div className="flex flex-col flex-grow ">
        <div className="sticky top-18 p-5 bg-white z-10">
          <div className=" flex justify-between relative">
            <ChatroomViewModeToggle
              viewMode={viewMode}
              onClick={(nextMode: ChatroomViewModeValue) => handleViewModeChange(nextMode)}
            />
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
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          {viewMode === 'all' ? (
            <>
              <ChatroomSortOptions
                sortOption={sortOption}
                onClick={(option: ChatroomSortOptionValue) => handleSortOptionChange(option)}
              />
              <AllChatroomsList sortOption={sortOption} />
            </>
          ) : (
            <JoinedChatroomList />
          )}
        </div>
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
