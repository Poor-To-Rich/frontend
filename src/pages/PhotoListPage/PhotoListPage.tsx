import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetAllPhotoListInfiniteQuery from '@/hooks/apis/photo/useGetAllPhotoListInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DateGroupedImageGrid from '@/pages/PhotoListPage/components/DateGroupedImageGrid';

const PhotoListPage = () => {
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllPhotoListInfiniteQuery(chatroomId!);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const allPhotoList = data?.pages?.flatMap(page => page.photosByDate) || [];
  const isEmpty = allPhotoList?.length === 0;

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div>
      <DefaultHeader leftButton={<LeftArrowButton onClick={() => navigate(-1)} />} label="사진" />
      {allPhotoList && (
        <div>
          {allPhotoList.map(photoList => (
            <DateGroupedImageGrid {...photoList} />
          ))}
          {!isEmpty && hasNextPage && <div ref={observerRef} className="h-4" />}
        </div>
      )}
    </div>
  );
};

export default PhotoListPage;
