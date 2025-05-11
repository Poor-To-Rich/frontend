import { clsx } from 'clsx';
import { useState } from 'react';

interface Props {
  visibility: boolean;
}

const ToggleSwitch = ({ visibility }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(visibility);

  return (
    <button
      className={clsx(
        'w-[5.3rem] h-[2.5rem] rounded-4xl relative cursor-pointer',
        isActive ? 'bg-oliveGreen' : 'bg-strokeGray',
      )}
      onClick={() => setIsActive(!isActive)}>
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
