export type RecentPhotosType = {
  photoId: number;
  photoUrl: string;
};

export type PhotosByDateType = {
  date: string;
  photos: RecentPhotosType[];
};

export type UploadPhotoRes = {
  photoUrl: string;
};

export type RecentPhotosRes = {
  photos: RecentPhotosType[];
};
