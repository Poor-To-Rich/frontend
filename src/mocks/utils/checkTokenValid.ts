import { jwtDecode } from 'jwt-decode';

type JWTPayload = {
  exp: number;
  [key: string]: any;
};

export const isTokenValid = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JWTPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (e) {
    return false;
  }
};
