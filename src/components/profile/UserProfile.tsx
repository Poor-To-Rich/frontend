import ProfilePhoto from '@/components/photo/profile/ProfilePhoto';
import CrownIcon from '@/components/icon/CrownIcon';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';
import clsx from 'clsx';
import { RankingType } from '@/types/profileType';

interface Props {
  profileImage: string;
  nickname: string;
  userId: number;
  isHost: boolean;
  rankingType: RankingType;
  nicknameAlign: 'center' | 'top';
  createAt?: string;
}

const UserProfile = ({ profileImage, nickname, userId, isHost, rankingType, nicknameAlign, createAt }: Props) => {
  const rankingIcon = (() => {
    if (rankingType === 'SAVER') return <img src={SaverIcon} width={25} height={25} />;
    if (rankingType === 'FLEXER') return <img src={FlexerIcon} width={30} height={30} />;
    return;
  })();

  return (
    <div className={clsx('flex gap-5', nicknameAlign === 'center' ? 'items-center ' : 'items-start')}>
      <button
        className="relative cursor-pointer"
        onClick={() => {
          console.log(userId);
        }}>
        <ProfilePhoto photo={profileImage} className="w-20" />
        <span className="absolute -bottom-2 -right-3">{rankingIcon}</span>
      </button>
      <div className="flex flex-col items-start gap-1.5">
        <div className="flex items-center gap-2 ">
          <p>{nickname}</p>
          {isHost && <CrownIcon size={20} />}
        </div>
        {createAt && <p className="text-sm text-defaultGrey">{createAt}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
