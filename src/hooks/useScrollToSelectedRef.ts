import { useEffect, useRef } from 'react';

const useScrollToSelectedRef = () => {
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }

    const timeout = setTimeout(() => {
      sessionStorage.removeItem('selected-id');
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    selectedRef,
  };
};

export default useScrollToSelectedRef;
