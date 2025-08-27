import { UserProfileType } from '@/types/profileType';

export type RecentRankingType = {
  rankingId: number;
  rankedAt: string;
  saver: UserProfileType;
  flexer: UserProfileType;
};

export type BaseRankingType = {
  rankingId?: number;
  rankedAt: string;
  saverRankings: UserProfileType[];
  flexerRankings: UserProfileType[];
};

export type AllRankingListRes = {
  hasNext: boolean;
  nextCursor: number;
  rankings: BaseRankingType[];
};
