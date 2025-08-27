import CrownIcon from '@/components/icon/CrownIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { UserProfileType } from '@/types/profileType';
import clsx from 'clsx';

interface Props extends UserProfileType {
  isKing?: boolean;
  className?: string;
  onClick?: () => void;
}

const RankingUserProfile = ({ profileImage, nickname, userId, isKing, className, onClick }: Props) => {
  return (
    <div
      className={clsx('flex w-20 h-fit flex-col items-center gap-2.5', !userId && 'opacity-0', className)}
      onClick={onClick}>
      <div className="flex flex-col items-center">
        {isKing && <CrownIcon />}
        <p className="text-md text-center w-20 truncate">{nickname}</p>
      </div>
      <ProfilePhoto photo={profileImage} className="w-15 sm:w-20" onClick={() => console.log(userId)} />
    </div>
  );
};

export default RankingUserProfile;
