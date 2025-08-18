import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { RecentPhotosRes, UploadPhotoRes } from '@/types/photoType';

export const uploadChatroomPhoto = async (chatroomId: string, body: FormData) => {
  const res = await fetchData<FormData, UploadPhotoRes>('POST', endpoints.photo.uploadChatroomPhoto(chatroomId), body);
  return res.data;
};

export const getRecentPhotos = async (chatroomId: string) => {
  const res = await fetchData<undefined, RecentPhotosRes>('GET', endpoints.photo.getRecentPhotos(chatroomId));
  return res.data?.photos;
};
