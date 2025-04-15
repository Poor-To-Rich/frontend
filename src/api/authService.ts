import { fetchData } from '@/api/axios';
import { AUTH } from '@/api/endpoints';
import { UsernameDuplicationReq } from '@/types/authTypes';
import { ResponseDefaultType } from '@/types/responseType';

export const checkUsernameDuplication = async ({ username }: UsernameDuplicationReq) => {
  const res = await fetchData<ResponseDefaultType, UsernameDuplicationReq>('POST', AUTH.CHECK_USERNAME_DUPLICATE, {
    username,
  });
  return res;
};
