import React, { useEffect, useCallback } from 'react';

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
  threshold = 0.5,
}: UseInfiniteScrollOptions) => {
  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const currentElement = observerRef.current;

    if (!currentElement || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleFetchNextPage();
        }
      },
      { threshold },
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [observerRef, hasNextPage, threshold, handleFetchNextPage]);
};

export default useInfiniteScroll;
