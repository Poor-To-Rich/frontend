import { useState } from 'react';
import CheckedCircleIcon from '@/components/icon/CheckedCircleIcon';
import DefaultCircleIcon from '@/components/icon/DefaultCircleIcon';

const ConsentCheckbox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={() => {
        setIsChecked(prev => !prev);
      }}
      className="flex items-center gap-2 cursor-pointer">
      {isChecked ? <CheckedCircleIcon /> : <DefaultCircleIcon />}
    </button>
  );
};

export default ConsentCheckbox;
