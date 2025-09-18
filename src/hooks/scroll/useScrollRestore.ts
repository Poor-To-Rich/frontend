import { useLayoutEffect, useRef } from 'react';

interface UseScrollRestoreProps {
  storageKey: string;
  isSuccess: boolean;
  isFetchingNextPage: boolean;
}

export const useScrollRestore = ({ storageKey, isSuccess, isFetchingNextPage }: UseScrollRestoreProps) => {
  const hasRestoredInitialScroll = useRef(false);

  useLayoutEffect(() => {
    if (!isSuccess || isFetchingNextPage || hasRestoredInitialScroll.current) return;

    const savedY = sessionStorage.getItem(storageKey);
    if (!savedY) return;

    const y = Number(savedY);
    window.scrollTo(0, y);
    hasRestoredInitialScroll.current = true;
  }, [isSuccess, isFetchingNextPage, storageKey]);
};
