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

export type AllPhotosType = BasePhotoType & {
  uploadedAt: string;
};

export type AllPhotoListRes = {
  nextCursor: { date: string; id: number };
  hasNext: boolean;
  photoCount: number;
  photos: AllPhotosType[];
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
