import { z } from 'zod';
import { signupSchema } from '@/schemas/authSchema';

export type FieldStatusType = {
  message: string | undefined;
  isVerify: boolean;
};

export type SignupData = z.infer<typeof signupSchema>;

export type UsernameDuplicationReq = {
  username: string;
};

export type NicknameDuplicationReq = {
  nickname: string;
};

export const emailPurposeList = ['register', 'changeEmail'] as const;

export type EmailPurposeType = (typeof emailPurposeList)[number];

export type EmailCodeSendReq = { email: string; purpose: EmailPurposeType };

export type EmailCodeVerifyReq = EmailCodeSendReq & { verificationCode: number };
