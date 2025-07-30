import ChatroomSortOptions from '@/components/button/ChatroomSortOptions';
import ChatroomSearchButton from '@/components/button/icon/ChatroomSearchButton';
import ChatroomSettingsButton from '@/components/button/icon/ChatroomSettingsButton';
import MyHostedChatroomsButton from '@/components/button/icon/MyHostedChatroomsButton';
import PlusButton from '@/components/button/icon/PlusButton';
import ChatroomViewModeToggle from '@/components/button/toggle/ChatroomViewModeToggle';
import DefaultHeader from '@/components/header/DefaultHeader';
import TapBar from '@/components/tapbar/TapBar';
import { ChatroomSortOptionValue, ChatroomViewModeValue } from '@/types/chatTypes';
import { useState } from 'react';
import AllChatroomsList from './components/AllChatroomsList';
import JoinedChatroomList from './components/JoinedChatroomList';

const ChatLobbyPage = () => {
  const [viewMode, setViewMode] = useState<ChatroomViewModeValue>('all');
  const [sortOption, setSortOption] = useState<ChatroomSortOptionValue>('popularity');

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DefaultHeader label="지갑 봉합소" rightButton={<PlusButton />} />
      <div className="flex-grow p-5">
        <div className="flex justify-between">
          <ChatroomViewModeToggle viewMode={viewMode} onClick={(value: ChatroomViewModeValue) => setViewMode(value)} />
          <div className="flex gap-3">
            <ChatroomSearchButton />
            <MyHostedChatroomsButton />
            <ChatroomSettingsButton />
          </div>
        </div>
        {viewMode === 'all' && (
          <ChatroomSortOptions
            sortOption={sortOption}
            onClick={(value: ChatroomSortOptionValue) => setSortOption(value)}
          />
        )}

        {viewMode === 'all' ? <AllChatroomsList sortOption={sortOption} /> : <JoinedChatroomList />}
      </div>
      <TapBar page="chat" />
    </div>
  );
};

export default ChatLobbyPage;
