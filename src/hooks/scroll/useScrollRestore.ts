import { useLayoutEffect } from 'react';

interface UseScrollRestoreProps {
  storageKey: string;
  isSuccess: boolean;
  isFetchingNextPage: boolean;
}

export const useScrollRestore = ({ storageKey, isSuccess, isFetchingNextPage }: UseScrollRestoreProps) => {
  useLayoutEffect(() => {
    if (!isSuccess || isFetchingNextPage) return;

    const savedY = sessionStorage.getItem(storageKey);
    if (!savedY) return;

    const y = Number(savedY);
    window.scrollTo(0, y);
  }, [isSuccess, isFetchingNextPage, storageKey]);
};
