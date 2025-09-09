import DateGroupedImageGrid from '@/pages/PhotoListPage/components/DateGroupedImageGrid';
import { groupBy } from 'lodash';
import { useRef } from 'react';
import useGetAllPhotoListInfiniteQuery from '@/hooks/apis/photo/useGetAllPhotoListInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const PhotoList = () => {
  const { chatroomId } = useParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending } = useGetAllPhotoListInfiniteQuery(
    chatroomId!,
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  const allPhotoList = data?.pages?.flatMap(page => page.photos) || [];
  const grouped = groupBy(allPhotoList, p => p.uploadedAt);
  const photosByDate = Object.entries(grouped).map(([date, photos]) => ({
    date,
    photos,
  }));
  const isEmpty = photosByDate.length === 0;

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
        <div className="w-full flex-grow flex items-center justify-center text-defaultGrey">사진이 없습니다</div>
      ) : (
        photosByDate &&
        chatroomId && (
          <div>
            {photosByDate.map(photoList => (
              <DateGroupedImageGrid
                key={photoList.date}
                chatroomId={chatroomId}
                date={photoList.date}
                photos={photoList.photos}
              />
            ))}
            {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
          </div>
        )
      )}
    </>
  );
};

export default PhotoList;
