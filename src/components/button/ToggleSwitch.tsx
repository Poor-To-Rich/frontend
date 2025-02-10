import clsx from 'clsx';
import { useState } from 'react';

const ToggleSwitch = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  return (
    <button
      className={clsx('w-[5.5rem] h-[2.7rem] rounded-4xl relative', isActive ? 'bg-oliveGreen' : 'bg-strokeGray')}
      onClick={() => setIsActive(!isActive)}>
      <div
        className={clsx(
          'w-[2rem] aspect-square rounded-full absolute top-1/2 -translate-y-1/2 bg-white',
          isActive ? 'right-2' : 'left-2',
        )}
      />
    </button>
  );
};

export default ToggleSwitch;
