import { TransactionItemType } from '@/types/transactionTypes';
import { useEffect, useRef } from 'react';

const useScrollToSelectedRef = (type: 'period' | 'id', deps?: TransactionItemType[]) => {
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }

    const timeout = setTimeout(() => {
      sessionStorage.removeItem(`selected-${type}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [deps, type]);

  return { selectedRef };
};

export default useScrollToSelectedRef;
