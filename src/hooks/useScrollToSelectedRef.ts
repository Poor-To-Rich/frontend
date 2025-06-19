import { TransactionItemType } from '@/types/transactionTypes';
import { useEffect, useRef } from 'react';

const useScrollToSelectedRef = (type: 'period' | 'id' | 'category', deps?: TransactionItemType[]) => {
  const selectedRef = useRef<HTMLButtonElement | null>(null);
  const targetItem = sessionStorage.getItem(`selected-${type}`);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
    }

    const timeout = setTimeout(() => {
      sessionStorage.removeItem(`selected-${type}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [deps, type]);

  return { selectedRef, targetItem };
};

export default useScrollToSelectedRef;
