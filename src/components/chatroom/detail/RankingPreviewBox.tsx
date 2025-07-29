import MedalIcon from '@/components/icon/MedalIcon';
import SeeMoreButton from '@/components/chatroom/detail/SeeMoreButton';
import { UserProfileType } from '@/types/profileType';
import PreviewRankingProfile from '@/components/profile/PreviewRankingProfile';

interface Props {
  rankingId: number;
  rankedAt: string;
  saver: UserProfileType;
  flexer: UserProfileType;
}

const RankingPreviewBox = ({ rankedAt, saver, flexer }: Props) => {
  return (
    <div className="w-full border border-strokeGray p-7 rounded-3xl">
      <div className="w-full flex justify-between items-center mb-7">
        <h4 className="flex gap-1.5 items-center ">
          <MedalIcon />
          <span>랭킹</span>
          <span className="text-md">{rankedAt}</span>
        </h4>
        <SeeMoreButton />
      </div>
      {!saver || !flexer ? (
        <div className="w-full h-32 flex items-center justify-center text-defaultGrey">공지가 없습니다</div>
      ) : (
        <div className="flex justify-center gap-28">
          <PreviewRankingProfile {...saver} />
          <PreviewRankingProfile {...flexer} />
        </div>
      )}
    </div>
  );
};

export default RankingPreviewBox;
