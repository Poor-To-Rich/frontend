import { z } from 'zod';

export const ChatroomSchema = z.object({
  chatroomImage: z.union([z.instanceof(File), z.string()]).optional(),
  chatroomTitle: z.string().min(1, '채팅방 이름을 입력해주세요.').max(30, '이름은 최대 30자까지 입력가능합니다.'),
  maxMemberCount: z.number(),
  description: z.string().min(1, '채팅방 설명을 입력해주세요.').max(100, '설명은 최대 100자까지 가능합니다.'),
  hashtags: z.array(z.string()).max(10, '태그는 최대 10개까지 입력 가능합니다'),
  isRankingEnabled: z.boolean().optional(),
  chatroomPassword: z.string().max(20, '비밀번호는 최대 20자까지 가능합니다').optional(),
  isDefaultProfile: z.boolean(),
});
