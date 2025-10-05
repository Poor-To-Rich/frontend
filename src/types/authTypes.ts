import { z } from 'zod';
import {
  changePasswordSchema,
  emailChangeSchema,
  findUserForPasswordSchema,
  findUsernameSchema,
  loginSchema,
  profileSchema,
  resetPasswordSchema,
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

export type FindUsernameReq = {
  email: string;
};

export type FindUsernameRes = {
  username: string;
};

export const emailPurposeList = ['register', 'changeEmail', 'findUsername', 'changePassword'] as const;

export type EmailPurposeType = (typeof emailPurposeList)[number];

export type UserRoleType = {
  role: 'USER' | 'ADMIN' | 'TEST' | 'PENDING' | 'KAKAO_EXISTING_USER_PENDING';
};

export type SendEmailReq = { email: string; purpose: EmailPurposeType; username?: string };

export type EmailRes = { notificationMessage: string };

export type VerifyEmailCodeReq = SendEmailReq & { verificationCode: number };

export type LoginFormType = z.infer<typeof loginSchema>;

export type ProfileFormData = z.infer<typeof profileSchema>;

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export type EmailChangeData = z.infer<typeof emailChangeSchema>;

export type FindUsernameFormType = z.infer<typeof findUsernameSchema>;

export type FindUserForPassword = z.infer<typeof findUserForPasswordSchema>;

export type ResetPassword = z.infer<typeof resetPasswordSchema>;

export type TokenRes = {
  accessToken: string;
};

export type ProfileUpdateFormData = ProfileFormData & {
  isDefaultProfile?: boolean;
};

export type UserDetailType = ProfileFormData & {
  userId: number;
};
