import ActiveHeartIcon from '@/components/icon/ActiveHeartIcon';
import DefaultHeartIcon from '@/components/icon/DefaultHeartIcon';
import { useState } from 'react';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <button onClick={() => setIsLiked(prev => !prev)} className="cursor-pointer w-fit h-full">
      {isLiked ? <ActiveHeartIcon /> : <DefaultHeartIcon />}
    </button>
  );
};

export default LikeButton;
