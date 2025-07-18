import { z } from 'zod';
import {
  changePasswordSchema,
  emailChangeSchema,
  loginSchema,
  profileSchema,
  signupSchema,
} from '@/schemas/authSchema';

export type SignupFormType = z.infer<typeof signupSchema>;

export type UsernameDuplicationReq = {
  username: string;
};

export type NicknameDuplicationReq = {
  nickname: string;
};

export type GetUserEmailRes = {
  email: string;
};

export type ChangeUserEmailReq = {
  email: string;
};

export const emailPurposeList = ['register', 'changeEmail'] as const;

export type EmailPurposeType = (typeof emailPurposeList)[number];

export type SendEmailReq = { email: string; purpose: EmailPurposeType };

export type EmailRes = { notificationMessage: string };

export type VerifyEmailCodeReq = SendEmailReq & { verificationCode: number };

export type LoginFormType = z.infer<typeof loginSchema>;

export type ProfileFormData = z.infer<typeof profileSchema>;

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export type EmailChangeData = z.infer<typeof emailChangeSchema>;

export type TokenRes = {
  accessToken: string;
};

export type ProfileUpdateFormData = ProfileFormData & {
  isDefaultProfile?: boolean;
};
