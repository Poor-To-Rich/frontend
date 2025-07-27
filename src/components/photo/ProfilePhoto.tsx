import { RankingType } from '@/types/profileType';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';
import clsx from 'clsx';

interface Props {
  photo: string;
  rankingType?: RankingType;
  onClick?: () => void;
  className?: string;
}

const ProfilePhoto = ({ photo, rankingType, onClick, className }: Props) => {
  const rankingIcon = (() => {
    if (rankingType === 'SAVER') return <img src={SaverIcon} width={25} height={25} />;
    if (rankingType === 'FLEXER') return <img src={FlexerIcon} width={30} height={30} />;
    return;
  })();

  return (
    <button className="relative cursor-pointe" onClick={onClick}>
      <img
        src={photo}
        className={clsx('aspect-square object-cover bg-white border border-strokeGray rounded-xl', className)}
      />
      <span className="absolute -bottom-2 -right-3">{rankingIcon}</span>
    </button>
  );
};

export default ProfilePhoto;
