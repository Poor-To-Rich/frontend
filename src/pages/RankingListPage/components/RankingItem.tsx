import { BaseRankingType } from '@/types/rankingType';
import RankingPodium from '@/components/ranking/RankingPodium';
import clsx from 'clsx';
import { format } from 'date-fns';

interface Props extends BaseRankingType {
  hasUnderLine: boolean;
}

const RankingItem = ({ rankedAt, saverRankings, flexerRankings, hasUnderLine }: Props) => {
  return (
    <div className={clsx('flex flex-col gap-7 p-7', hasUnderLine && 'border-b border-strokeGray')}>
      <h4 className="flex gap-2.5">
        <span role="img" aria-label="trophy">
          🏆
        </span>
        {format(rankedAt, 'yyyy년 MM월 dd일')} 랭킹
      </h4>
      <div className="flex justify-between sm:px-10">
        <RankingPodium rankings={saverRankings} rankingType={'SAVER'} />
        <RankingPodium rankings={flexerRankings} rankingType={'FLEXER'} />
      </div>
    </div>
  );
};

export default RankingItem;
