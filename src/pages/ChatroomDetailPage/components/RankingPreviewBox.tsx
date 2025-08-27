import MedalIcon from '@/components/icon/MedalIcon';
import SeeMoreButton from '@/pages/ChatroomDetailPage/components/SeeMoreButton';
import PreviewRankingProfile from '@/components/profile/PreviewRankingProfile';
import useGetRecentRanking from '@/hooks/apis/ranking/useGetRecentRanking';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Props {
  chatroomId: string;
}

const RankingPreviewBox = ({ chatroomId }: Props) => {
  const navigate = useNavigate();
  const { data: recentRanking } = useGetRecentRanking(chatroomId);

  return (
    <div className="w-full border border-strokeGray p-7 rounded-3xl">
      {recentRanking && (
        <>
          <div className="w-full flex justify-between items-center mb-7">
            <h4 className="flex gap-1.5 items-center">
              <MedalIcon />
              <span>랭킹</span>
              <span className="text-md leading-[1.0]">{format(recentRanking.rankedAt, 'yyyy.MM.dd')}</span>
            </h4>
            <SeeMoreButton onClick={() => navigate(`/chat/chatroom/${chatroomId}/rankings`)} />
          </div>

          {!recentRanking.saver || !recentRanking.flexer ? (
            <div className="w-full h-32 flex items-center justify-center text-defaultGrey">
              랭킹이 집계되지 않았습니다
            </div>
          ) : (
            <div className="flex justify-center gap-28">
              <PreviewRankingProfile {...recentRanking.saver} />
              <PreviewRankingProfile {...recentRanking.flexer} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RankingPreviewBox;
