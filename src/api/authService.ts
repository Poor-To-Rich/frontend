import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  SendEmailReq,
  NicknameDuplicationReq,
  UsernameDuplicationReq,
  VerifyEmailCodeReq,
  EmailCountRes,
  LoginFormType,
  TokenRes,
} from '@/types/authTypes';
import { tokenManager } from '@/utils/tokenManager';

export const checkUsernameDuplication = async ({ username }: UsernameDuplicationReq) => {
  const res = await fetchData<UsernameDuplicationReq>('POST', endpoints.auth.checkUsernameDuplicate, {
    username,
  });
  return res;
};

export const checkNicknameDuplication = async ({ nickname }: NicknameDuplicationReq) => {
  const res = await fetchData<NicknameDuplicationReq>('POST', endpoints.auth.checkNicknameDuplicate, {
    nickname,
  });
  return res;
};

export const sendEmailCode = async ({ email, purpose }: SendEmailReq) => {
  const res = await fetchData<SendEmailReq>('POST', endpoints.email.sendEmail, { email, purpose });
  return res;
};

export const getSendEmailCount = async (email: string) => {
  const res = await fetchData<undefined, EmailCountRes>('GET', endpoints.email.getSendEmailCount(email));
  return res;
};

export const verifyEmailCode = async ({ email, purpose, verificationCode }: VerifyEmailCodeReq) => {
  const res = await fetchData<VerifyEmailCodeReq>('POST', endpoints.email.verifyCode, {
    email,
    purpose,
    verificationCode,
  });
  return res;
};

export const getVerifyEmailCodeCount = async (email: string) => {
  const res = await fetchData<undefined, EmailCountRes>('GET', endpoints.email.getVerifyEmailCodeCount(email));
  return res;
};

export const signup = async (body: FormData) => {
  const res = await fetchData<FormData, undefined, { field: string }>('POST', endpoints.auth.signup, body);
  return res;
};

export const login = async (body: LoginFormType) => {
  const res = await fetchData<LoginFormType, TokenRes>('POST', endpoints.auth.login, body);
  return res;
};

export const refreshToken = async () => {
  const res = await fetchData<undefined, TokenRes>('POST', endpoints.auth.refreshToken);

  if (res.data) {
    const newToken = res.data.accessToken;
    tokenManager.setToken(newToken);
    return newToken;
  }
};
