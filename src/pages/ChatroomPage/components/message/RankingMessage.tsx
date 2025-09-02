import RankingPodium from '@/components/ranking/RankingPodium';
import { RANKING_RESULT_ANNOUNCEMENT_MESSAGE, RANKING_RESULT_NOT_AVAILABLE_MESSAGE } from '@/constants/message';
import { RankingMessageType } from '@/types/messageType';

const RankingMessage = ({ rankedAt, rankingId, saverRankings, flexerRankings }: RankingMessageType) => {
  return (
    <div className="w-full bg-lightBlue rounded-3xl p-10">
      {rankingId ? (
        <>
          <p className="text-center mb-10 font-bold">👑 {rankedAt} 👑</p>
          <div className="flex gap-10">
            <RankingPodium rankings={saverRankings} rankingType={'SAVER'} />
            <RankingPodium rankings={flexerRankings} rankingType={'FLEXER'} />
          </div>
          <p
            className="whitespace-pre-wrap text-center mt-10"
            dangerouslySetInnerHTML={{ __html: RANKING_RESULT_ANNOUNCEMENT_MESSAGE }}
          />
        </>
      ) : (
        <p
          className="whitespace-pre-wrap text-center"
          dangerouslySetInnerHTML={{ __html: RANKING_RESULT_NOT_AVAILABLE_MESSAGE }}
        />
      )}
    </div>
  );
};

export default RankingMessage;
