import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetAllPhotoListInfiniteQuery from '@/hooks/apis/photo/useGetAllPhotoListInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DateGroupedImageGrid from '@/pages/PhotoListPage/components/DateGroupedImageGrid';
import { groupBy } from 'lodash';

const PhotoListPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllPhotoListInfiniteQuery(chatroomId!);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const allPhotoList = data?.pages?.flatMap(page => page.photos) || [];
  const grouped = groupBy(allPhotoList, p => p.uploadedAt);
  const photosByDate = Object.entries(grouped).map(([date, photos]) => ({
    date,
    photos,
  }));
  const isEmpty = photosByDate.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div>
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="사진" />
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
    </div>
  );
};

export default PhotoListPage;
