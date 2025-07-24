import { RankingType } from '@/types/rackingType';
import ProfilePhoto from '@/components/photo/profile/ProfilePhoto';
import CrownIcon from '@/components/icon/CrownIcon';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';
import clsx from 'clsx';

interface Props {
  profileImage: string;
  nickname: string;
  userId: number;
  isHost: boolean;
  rankingType: RankingType;
  profileType: 'default' | 'message';
}

const UserProfile = ({ profileImage, nickname, userId, isHost, rankingType, profileType }: Props) => {
  const rankingIcon = (() => {
    if (rankingType === 'SAVER') return <img src={SaverIcon} width={25} height={25} />;
    if (rankingType === 'FLEXER') return <img src={FlexerIcon} width={30} height={30} />;
    return;
  })();

  return (
    <div className={clsx('flex gap-5', profileType === 'default' ? 'items-center ' : 'items-start')}>
      <button
        className="relative cursor-pointer"
        onClick={() => {
          console.log(userId);
        }}>
        <ProfilePhoto photo={profileImage} className="w-20" />
        <span className="absolute -bottom-2 -right-5">{rankingIcon}</span>
      </button>
      <div className="flex items-center gap-2 ">
        <p>{nickname}</p>
        {isHost && <CrownIcon size={20} />}
      </div>
    </div>
  );
};

export default UserProfile;
