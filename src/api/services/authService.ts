import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  SendEmailReq,
  NicknameDuplicationReq,
  UsernameDuplicationReq,
  VerifyEmailCodeReq,
  LoginFormType,
  TokenRes,
  EmailRes,
  ProfileFormData,
  ChangePasswordData,
  GetUserEmailRes,
  ChangeEmailReq,
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
  const res = await fetchData<SendEmailReq, EmailRes>('POST', endpoints.email.sendEmail, { email, purpose });
  return res;
};

export const verifyEmailCode = async ({ email, purpose, verificationCode }: VerifyEmailCodeReq) => {
  const res = await fetchData<VerifyEmailCodeReq, EmailRes>('POST', endpoints.email.verifyCode, {
    email,
    purpose,
    verificationCode,
  });
  return res;
};

export const getUserEmail = async () => {
  const res = await fetchData<undefined, GetUserEmailRes>('GET', endpoints.email.getUserEmail);
  return res.data?.email;
};

export const changeEmail = async (body: ChangeEmailReq) => {
  const res = await fetchData<ChangeEmailReq, undefined>('PUT', endpoints.email.changeEmail, body);
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

export const logout = async () => {
  const res = await fetchData<undefined, undefined>('POST', endpoints.auth.logout);
  return res;
};

export const deleteUser = async () => {
  const res = await fetchData<undefined, undefined>('DELETE', endpoints.auth.deleteUser);
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

export const getUserDetails = async () => {
  const res = await fetchData<undefined, ProfileFormData>('GET', endpoints.auth.getUserDetails);
  return res.data;
};

export const updateUserDetails = async (body: FormData) => {
  const res = await fetchData<FormData, undefined, { field: string }>('PUT', endpoints.auth.updateUserDetails, body);
  return res;
};

export const updatePassword = async (body: ChangePasswordData) => {
  const res = await fetchData<ChangePasswordData, undefined, { field: string }>(
    'PUT',
    endpoints.auth.updatePassword,
    body,
  );
  return res;
};

export const resetData = async () => {
  const res = await fetchData<undefined, undefined>('DELETE', endpoints.auth.dataReset);
  return res;
};
