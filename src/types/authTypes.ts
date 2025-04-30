import { z } from 'zod';
import { loginSchema, signupSchema } from '@/schemas/authSchema';

export type SignupFormType = z.infer<typeof signupSchema>;

export type UsernameDuplicationReq = {
  username: string;
};

export type NicknameDuplicationReq = {
  nickname: string;
};

export const emailPurposeList = ['register', 'changeEmail'] as const;

export type EmailPurposeType = (typeof emailPurposeList)[number];

export type SendEmailReq = { email: string; purpose: EmailPurposeType };

export type EmailCountRes = { remainingAttempts: string };

export type VerifyEmailCodeReq = SendEmailReq & { verificationCode: number };

export type LoginFormType = z.infer<typeof loginSchema>;

export type LoginRes = {
  accessToken: string;
};
