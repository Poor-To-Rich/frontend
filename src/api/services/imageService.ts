import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { UploadPhotoRes } from '@/types/photoType';

export const uploadChatroomPhoto = async (chatroomId: string, body: FormData) => {
  const res = await fetchData<FormData, UploadPhotoRes>('POST', endpoints.photo.uploadChatroomPhoto(chatroomId), body);
  return res.data;
};
