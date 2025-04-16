import { fetchData } from '@/api/axios';
import { AUTH, EMAIL } from '@/api/endpoints';
import { EmailCodeSendReq, NicknameDuplicationReq, UsernameDuplicationReq } from '@/types/authTypes';

export const checkUsernameDuplication = async ({ username }: UsernameDuplicationReq) => {
  const res = await fetchData<UsernameDuplicationReq>('POST', AUTH.CHECK_USERNAME_DUPLICATE, {
    username,
  });
  return res;
};

export const checkNicknameDuplication = async ({ nickname }: NicknameDuplicationReq) => {
  const res = await fetchData<NicknameDuplicationReq>('POST', AUTH.CHECK_NICKNAME_DUPLICATE, {
    nickname,
  });
  return res;
};

export const sendEmailCode = async ({ email, purpose }: EmailCodeSendReq) => {
  const res = await fetchData<EmailCodeSendReq>('POST', EMAIL.EMAIL_SEND, { email, purpose });
  return res;
};
