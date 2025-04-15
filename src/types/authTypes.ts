import { z } from 'zod';
import { signupSchema } from '@/schemas/authSchema';

export type SignupData = z.infer<typeof signupSchema>;

export type UsernameDuplicationReq = {
  username: string;
};
