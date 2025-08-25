import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { AllPhotoListRes, RecentPhotoListRes, UploadPhotoRes } from '@/types/photoType';

export const uploadChatroomPhoto = async (chatroomId: string, body: FormData) => {
  const res = await fetchData<FormData, UploadPhotoRes>('POST', endpoints.photo.uploadChatroomPhoto(chatroomId), body);
  return res.data;
};

export const getRecentPhotoList = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentPhotoListRes>('GET', endpoints.photo.getRecentPhotoList(chatroomId));
  return res.data?.photos;
};

export const getAllPhotoList = async (chatroomId: string, cursor?: string | null) => {
  const res = await fetchData<undefined, AllPhotoListRes>('GET', endpoints.photo.getAllPhotoList(chatroomId, cursor));
  if (!res.data) throw new Error('No Data');
  return res.data;
};
