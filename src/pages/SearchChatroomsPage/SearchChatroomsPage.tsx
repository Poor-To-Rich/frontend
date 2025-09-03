import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import InputActionBox from '@/components/chatroom/input/InputActionBox';
import DefaultHeader from '@/components/header/DefaultHeader';
import useSearchChatrooms from '@/hooks/apis/chat/useSearchChatrooms';

const SearchChatroomsPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  const { data: searchChatrooms } = useSearchChatrooms(submittedKeyword);

  useEffect(() => {
    const storagedKeyword = sessionStorage.getItem('keyword') ?? '';
    setKeyword(storagedKeyword);
    setSubmittedKeyword(storagedKeyword);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <DefaultHeader
        leftButton={
          <LeftArrowButton
            onClick={() => {
              navigate(-1);
              sessionStorage.removeItem('keyword');
            }}
          />
        }
        label="채팅방 검색"
      />
      <div className="flex flex-col flex-grow p-5 gap-5">
        <InputActionBox
          placeholder="검색어를 입력해주세요"
          buttonLabel="검색"
          value={keyword}
          onChange={e => {
            setKeyword(e.target.value);
            setSubmittedKeyword('');
          }}
          onSubmit={() => {
            setSubmittedKeyword(keyword);
            sessionStorage.setItem('keyword', keyword);
          }}
        />
        {!searchChatrooms || searchChatrooms.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-defaultGrey">검색된 채팅방이 없습니다</div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {searchChatrooms.map(chatroom => (
              <PublicChatroomItem key={chatroom.chatroomId} {...chatroom} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchChatroomsPage;
