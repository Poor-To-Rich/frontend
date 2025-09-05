import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import InputActionBox from '@/components/chatroom/input/InputActionBox';
import DefaultHeader from '@/components/header/DefaultHeader';
import SearchChatroomList from '@/pages/SearchChatroomsPage/components/SearchChatroomList';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

const SearchChatroomsPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

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
      <PageErrorBoundary>
        <FetchErrorBoundary>
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
            <SearchChatroomList submittedKeyword={submittedKeyword} />
          </div>
        </FetchErrorBoundary>
      </PageErrorBoundary>
    </div>
  );
};

export default SearchChatroomsPage;
