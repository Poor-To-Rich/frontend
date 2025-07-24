import CrownIcon from '@/components/icon/CrownIcon';
import ProfilePhoto from '@/components/photo/ProfilePhoto';

interface Props {
  profileImage: string;
  nickname: string;
  userId: number;
  isKing?: boolean;
}

const RankingUserProfile = ({ profileImage, nickname, userId, isKing }: Props) => {
  return (
    <div className="flex w-20 h-fit flex-col items-center gap-2.5">
      <div className="flex flex-col items-center">
        {isKing && <CrownIcon />}
        <p className="text-md text-center w-20 truncate">{nickname}</p>
      </div>
      <ProfilePhoto photo={profileImage} className="w-20" onClick={() => console.log(userId)} />
    </div>
  );
};

export default RankingUserProfile;
