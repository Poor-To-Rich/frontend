import FlexerPodium from '@/components/icon/FlexerPodium';
import SaverPodiumIcon from '@/components/icon/SaverPodiumIcon';
import RankingUserProfile from '@/components/profile/RankingUserProfile';
import { UserProfileType, RankingType } from '@/types/profileType';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';

interface Props {
  rankings: UserProfileType[];
  rankingType: Omit<RankingType, 'NONE'>;
}

const RankingPodium = ({ rankings, rankingType }: Props) => {
  const isSaver = rankingType === 'SAVER';

  return (
    <div className="flex flex-col items-center">
      <h4 className="flex items-center gap-2 text-xl font-semibold mt-3">
        <img src={isSaver ? SaverIcon : FlexerIcon} width={30} height={30} alt={`${rankingType}`} />
        {isSaver ? '절약왕' : '플렉스왕'}
      </h4>
      <div className="w-full relative h-44">
        <RankingUserProfile {...rankings[1]} className="absolute left-2.5 -bottom-5" />
        <RankingUserProfile {...rankings[0]} isKing className="absolute left-1/2 -translate-x-1/2 bottom-1" />
        <RankingUserProfile {...rankings[2]} className="absolute right-2.5 -bottom-5" />
      </div>
      {isSaver ? <SaverPodiumIcon /> : <FlexerPodium />}
    </div>
  );
};

export default RankingPodium;
