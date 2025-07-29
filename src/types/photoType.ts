export type PhotoType = {
  photoId: number;
  photoUrl: string;
};

export type PhotosByDateType = {
  date: string;
  photos: PhotoType[];
};
