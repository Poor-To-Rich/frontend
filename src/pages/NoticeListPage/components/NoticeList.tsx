import useGetAllNoticeListInfiniteQuery from '@/hooks/apis/notice/useGetAllNoticeListInfiniteQuery';
import { useRef } from 'react';
import useInfiniteScroll from '@/hooks/scroll/useInfiniteScroll';
import NoticeItem from '@/pages/NoticeListPage/components/NoticeItem';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props {
  chatroomId?: string;
}

const NoticeList = ({ chatroomId }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending } = useGetAllNoticeListInfiniteQuery(
    chatroomId!,
  );

  const observerRef = useRef<HTMLDivElement | null>(null);
  const allNoticeList = data?.pages?.flatMap(page => page.notices) || [];
  const isEmpty = allNoticeList?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  if (isPending) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
      {chatroomId &&
        (isEmpty ? (
          <div className="w-full flex-grow flex items-center justify-center text-defaultGrey">공지가 없습니다</div>
        ) : (
          <ul>
            {allNoticeList.map((notice, index) => (
              <li key={notice.noticeId}>
                <NoticeItem chatroomId={chatroomId} hasUnderLine={index < allNoticeList.length} {...notice} />
              </li>
            ))}
            {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
          </ul>
        ))}
    </>
  );
};

export default NoticeList;
