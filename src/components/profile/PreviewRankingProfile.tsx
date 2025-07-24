import ProfilePhoto from '@/components/photo/ProfilePhoto';
import { RankingType } from '@/types/profileType';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';

interface Props {
  profileImage: string;
  nickname: string;
  userId: number;
  rankingType: Exclude<RankingType, 'NONE'>;
}

const PreviewRankingProfile = ({ profileImage, nickname, userId, rankingType }: Props) => {
  const rankingMetaMap = {
    SAVER: {
      title: '절약왕',
      icon: <img src={SaverIcon} width={25} height={25} className="self-center" />,
    },
    FLEXER: {
      title: '플렉스왕',
      icon: <img src={FlexerIcon} width={30} height={30} className="self-center" />,
    },
  } as const;

  const rankingMeta = rankingMetaMap[rankingType] ?? '';

  return (
    <div className="flex w-fit h-fit flex-col items-center gap-2.5">
      <h4 className="flex gap-1.5">
        {rankingMeta.icon}
        <span className="text-lg">{rankingMeta.title}</span>
      </h4>
      <ProfilePhoto photo={profileImage} className="w-25" onClick={() => console.log(userId)} />
      <p>{nickname}</p>
    </div>
  );
};

export default PreviewRankingProfile;
