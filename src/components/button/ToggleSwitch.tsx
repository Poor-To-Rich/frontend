import useUpdateCategoryVisibility from '@/hooks/apis/category/useUpdateCategoryVisibility';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
  visibility: boolean;
}

const ToggleSwitch = ({ id, visibility }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(visibility);
  const { mutate: updateVisibility, isError } = useUpdateCategoryVisibility();

  const handleToggleClick = () => {
    setIsActive(prev => !prev);
    const body = { visibility: !isActive };
    updateVisibility({ id, body });
  };

  useEffect(() => {
    if (isError) {
      setIsActive(prev => !prev);
    }
  }, [isError]);

  return (
    <button
      className={clsx(
        'w-[5.3rem] h-[2.5rem] rounded-4xl relative cursor-pointer',
        isActive ? 'bg-oliveGreen' : 'bg-strokeGray',
      )}
      onClick={handleToggleClick}>
      <div
        className={clsx(
          'w-[1.6rem] aspect-square rounded-full absolute top-1/2 -translate-y-1/2 bg-white',
          isActive ? 'right-2' : 'left-2',
        )}
      />
    </button>
  );
};

export default ToggleSwitch;
