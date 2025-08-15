export type RankingType = 'SAVER' | 'FLEXER' | 'NONE';

export type UserProfileType = {
  userId: number;
  profileImage: string;
  nickname: string;
  isHost: boolean;
  rankingType: RankingType;
};
