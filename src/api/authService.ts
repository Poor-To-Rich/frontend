import { fetchData } from '@/api/axios';
import { AUTH } from '@/api/endpoints';
import { NicknameDuplicationReq, UsernameDuplicationReq } from '@/types/authTypes';
import { ResponseDefaultType } from '@/types/responseType';

export const checkUsernameDuplication = async ({ username }: UsernameDuplicationReq) => {
  const res = await fetchData<ResponseDefaultType, UsernameDuplicationReq>('POST', AUTH.CHECK_USERNAME_DUPLICATE, {
    username,
  });
  return res;
};

export const checkNicknameDuplication = async ({ nickname }: NicknameDuplicationReq) => {
  const res = await fetchData<ResponseDefaultType, NicknameDuplicationReq>('POST', AUTH.CHECK_NICKNAME_DUPLICATE, {
    nickname,
  });
  return res;
};
