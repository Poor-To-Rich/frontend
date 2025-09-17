import { useLayoutEffect } from 'react';

interface UseScrollRestoreProps {
  storageKey: string;
  enabled: boolean;
}

export const useScrollRestore = ({ storageKey, enabled }: UseScrollRestoreProps) => {
  useLayoutEffect(() => {
    if (!enabled) return;

    const savedY = sessionStorage.getItem(storageKey);
    if (!savedY) return;

    const y = Number(savedY);
    window.scrollTo(0, y);
  }, [enabled, storageKey]);
};
