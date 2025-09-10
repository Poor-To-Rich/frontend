import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetAllRakingListInfiniteQuery from '@/hooks/apis/ranking/useGetAllRakingListInfiniteQuery';
import useInfiniteScroll from '@/hooks/scroll/useInfiniteScroll';
import RankingItem from '@/pages/RankingListPage/components/RankingItem';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

const RankingList = () => {
  const { chatroomId } = useParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending } = useGetAllRakingListInfiniteQuery(
    chatroomId!,
  );

  const observerRef = useRef<HTMLLIElement | null>(null);
  const allRankingList = data?.pages?.flatMap(page => page.rankings ?? []) || [];
  const isEmpty = allRankingList?.length === 0;

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
      {isEmpty ? (
        <div className="w-full flex-grow flex items-center justify-center text-defaultGrey">랭킹이 없습니다</div>
      ) : (
        <ul>
          {allRankingList.map((ranking, index) => (
            <li key={ranking.rankedAt}>
              <RankingItem {...ranking} hasUnderLine={index < allRankingList.length} />
            </li>
          ))}
          {!isEmpty && hasNextPage && <li ref={observerRef} className="h-4" />}
        </ul>
      )}
    </>
  );
};

export default RankingList;
