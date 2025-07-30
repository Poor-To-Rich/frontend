import { useEffect } from 'react';

type UseClickOutsideProps = {
  refs: React.RefObject<HTMLElement>[];
  onClickOutside: () => void;
};

const useClickOutside = ({ refs, onClickOutside }: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInside = refs.some(ref => ref.current?.contains(target));
      if (!clickedInside) onClickOutside();
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [refs, onClickOutside]);
};

export default useClickOutside;
