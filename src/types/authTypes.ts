import { z } from 'zod';
import { signupSchema } from '@/schemas/authSchema';

export type SignupData = z.infer<typeof signupSchema>;

export type UsernameDuplicationReq = {
  username: string;
};

export type NicknameDuplicationReq = {
  nickname: string;
};

export type FieldStatusType = {
  message: string | undefined;
  isVerify: boolean;
};
