import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { AllRankingListRes, RecentRankingType } from '@/types/rankingType';

export const getRecentRanking = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentRankingType>('GET', endpoints.ranking.getRecentRanking(chatroomId));
  return res.data;
};

export const getAllRankingList = async (chatroomId: string, cursor?: string | null) => {
  const res = await fetchData<undefined, AllRankingListRes>(
    'GET',
    endpoints.ranking.getAllRankingList(chatroomId, cursor),
  );
  if (!res.data) throw new Error('No Data');
  return res.data;
};
