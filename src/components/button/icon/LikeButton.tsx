import ActiveHeartIcon from '@/components/icon/ActiveHeartIcon';
import DefaultHeartIcon from '@/components/icon/DefaultHeartIcon';
import useToggleChatroomLikeStatus from '@/hooks/apis/chat/useToggleChatroomLikeStatus';
import { useParams } from 'react-router-dom';

interface Props {
  isLiked?: boolean;
}

const LikeButton = ({ isLiked }: Props) => {
  const { chatroomId } = useParams();
  const { mutate: toggleLikeStatus } = useToggleChatroomLikeStatus(chatroomId!);

  const handleToggle = () => {
    toggleLikeStatus({
      isLiked: !isLiked,
    });
  };

  return (
    <button onClick={handleToggle} className="cursor-pointer w-fit h-auto">
      {isLiked ? <ActiveHeartIcon /> : <DefaultHeartIcon />}
    </button>
  );
};

export default LikeButton;
