import ProfilePhoto from '@/components/photo/ProfilePhoto';
import CrownIcon from '@/components/icon/CrownIcon';
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
  return (
    <div className={clsx('flex gap-5', nicknameAlign === 'center' ? 'items-center ' : 'items-start')}>
      <ProfilePhoto
        photo={profileImage}
        rankingType={rankingType}
        className="w-20"
        onClick={() => console.log(userId)}
      />
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
