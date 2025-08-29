import FlexerPodium from '@/components/icon/FlexerPodium';
import SaverPodiumIcon from '@/components/icon/SaverPodiumIcon';
import RankingUserProfile from '@/components/profile/RankingUserProfile';
import { UserProfileType, RankingType } from '@/types/profileType';
import SaverIcon from '/icon/SaverIcon.webp';
import FlexerIcon from '/icon/FlexerIcon.webp';
import useModal from '@/hooks/useModal';
import { useRef } from 'react';
import UserProfileModal from '@/pages/ChatroomPage/components/modal/UserProfileModal';
import { useParams } from 'react-router-dom';

interface Props {
  rankings: UserProfileType[];
  rankingType: Omit<RankingType, 'NONE'>;
}

const RankingPodium = ({ rankings, rankingType }: Props) => {
  const isSaver = rankingType === 'SAVER';
  const userProfile = useRef<UserProfileType>();
  const { chatroomId } = useParams();
  const { isOpen, openModal, closeModal } = useModal();

  const handleUserProfile = (index: number) => {
    userProfile.current = rankings[index];
    openModal();
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="flex items-center gap-2 mt-3">
        <img src={isSaver ? SaverIcon : FlexerIcon} width={30} height={30} alt={`${rankingType}`} />
        {isSaver ? '절약왕' : '플렉스왕'}
      </h4>
      <div className="w-full relative h-44">
        <RankingUserProfile
          {...rankings[1]}
          className="absolute left-0 sm:left-2.5 -bottom-5"
          onClick={() => handleUserProfile(1)}
        />
        <RankingUserProfile
          {...rankings[0]}
          isKing
          className="absolute left-1/2 -translate-x-1/2 bottom-0 sm:bottom-1 "
          onClick={() => handleUserProfile(0)}
        />
        <RankingUserProfile
          {...rankings[2]}
          className="absolute right-0 sm:right-2.5 -bottom-5"
          onClick={() => handleUserProfile(2)}
        />
      </div>
      {isSaver ? <SaverPodiumIcon /> : <FlexerPodium />}
      {isOpen && chatroomId && userProfile.current && (
        <UserProfileModal chatroomId={chatroomId} userProfile={userProfile.current} closeModal={closeModal} />
      )}
    </div>
  );
};

export default RankingPodium;
