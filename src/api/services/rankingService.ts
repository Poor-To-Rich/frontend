import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { RecentRankingType } from '@/types/rankingType';

export const getRecentRanking = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentRankingType>('GET', endpoints.ranking.getRecentRanking(chatroomId));
  return res.data;
};
