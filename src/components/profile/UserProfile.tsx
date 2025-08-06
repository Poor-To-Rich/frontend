import ProfilePhoto from '@/components/photo/ProfilePhoto';
import CrownIcon from '@/components/icon/CrownIcon';
import { UserProfileType } from '@/types/profileType';

interface Props extends UserProfileType {
  createAt?: string;
  hideRanking?: boolean;
}

const UserProfile = ({ profileImage, nickname, userId, isHost, rankingType, createAt, hideRanking }: Props) => {
  return (
    <div className={'flex gap-5 items-center'}>
      <ProfilePhoto
        photo={profileImage}
        rankingType={rankingType}
        hideRanking={hideRanking}
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
