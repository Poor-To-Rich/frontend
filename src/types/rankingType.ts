import { UserProfileType } from '@/types/profileType';

export type RankingPreviewType = {
  rankingId: number;
  rankedAt: string;
  saver: UserProfileType;
  flexer: UserProfileType;
};

export type BaseRankingType = {
  rankingId?: number;
  rankedAt?: string;
  saverRankings: UserProfileType[];
  flexerRankings: UserProfileType[];
};
