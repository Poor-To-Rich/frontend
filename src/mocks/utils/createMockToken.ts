const encode = (obj: object) => btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

export const createMockToken = (expInSec: number = 60 * 60) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: 'mock-user-id',
    username: 'woic',
    iat: now,
    exp: now + expInSec,
  };

  return `${encode(header)}.${encode(payload)}.signature`;
};

export const createMockAccessToken = () => createMockToken(10); // 5분
export const createMockRefreshToken = () => createMockToken(60 * 60 * 24 * 7); // 7일
