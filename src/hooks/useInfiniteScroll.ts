import React, { useEffect } from 'react';

interface UseInfiniteScrollOptions {
  observerRef: React.RefObject<Element>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

const useInfiniteScroll = ({
  observerRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => {
      observer.unobserve(current);
      observer.disconnect();
    };
  }, [observerRef, hasNextPage, fetchNextPage, isFetchingNextPage]);
};

export default useInfiniteScroll;
