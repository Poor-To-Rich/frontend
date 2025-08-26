export type BasePhotoType = {
  photoId: number;
  photoUrl: string;
};

export type PhotosByDateType = {
  date: string;
  photos: BasePhotoType[];
};

export type UploadPhotoRes = {
  photoUrl: string;
};

export type RecentPhotoListRes = {
  photos: BasePhotoType[];
};

export type AllPhotoListRes = {
  nextCursor: string;
  hasNext: boolean;
  photoCount: number;
  photosByDate: PhotosByDateType[];
};

export type PhotoUploadByType = {
  userId: number;
  nickname: string;
};

export type PhotoDetailRes = {
  photoId: number;
  photoUrl: string;
  uploadedAt: string;
  uploadedBy: PhotoUploadByType;
  prevPhotoId?: number;
  nextPhotoId?: number;
};
