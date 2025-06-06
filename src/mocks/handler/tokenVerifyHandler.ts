import { http, HttpResponse } from 'msw';
import { isTokenValid } from '@/mocks/utils/checkTokenValid';

export const tokenVerifyHandlers = [
  http.all('*', async ({ request }) => {
    const url = request.url;

    // Vite 내부 파일이나 정적 리소스 요청은 무시
    if (
      url.includes('.vite') ||
      url.endsWith('.js') ||
      url.endsWith('.css') ||
      url.endsWith('.map') ||
      url.includes('/node_modules/')
    ) {
      return;
    }

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!isTokenValid(token)) {
      return HttpResponse.json({ status: 401, message: '액세스 토큰이 만료되었습니다.' }, { status: 401 });
    }
  }),
];
