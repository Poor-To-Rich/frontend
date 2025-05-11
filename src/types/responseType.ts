export type ResponseDefaultType<T = undefined> = {
  status: number;
  message: string;
  data?: T;
};
