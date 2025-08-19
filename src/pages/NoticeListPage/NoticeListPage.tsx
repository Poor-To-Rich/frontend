import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import { useNavigate, useParams } from 'react-router-dom';
import NoticeItem from './components/NoticeItem';
import useGetAllNoticeListInfiniteQuery from '@/hooks/apis/notice/useGetAllNoticeListInfiniteQuery';
import { useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const NoticeListPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllNoticeListInfiniteQuery(chatroomId!);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const allNoticeList = data?.pages?.flatMap(page => page.notices) || [];
  const isEmpty = allNoticeList?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader
        leftButton={<LeftArrowButton onClick={() => navigate(-1)} />}
        label="공지"
        rightButton={<PlusButton onClick={() => navigate(`/chat/chatroom/notice/add`)} />}
      />
      {chatroomId && (
        <div>
          {allNoticeList.map((notice, index) => (
            <NoticeItem chatroomId={chatroomId} {...notice} hasUnderLine={index < allNoticeList.length - 1} />
          ))}
          {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
        </div>
      )}
    </div>
  );
};

export default NoticeListPage;
