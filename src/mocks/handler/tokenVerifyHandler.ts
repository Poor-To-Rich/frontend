import { http, HttpResponse } from 'msw';
import { isTokenValid } from '@/mocks/utils/checkTokenValid';

export const tokenVerifyHandlers = [
  http.get('*', async ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!isTokenValid(token)) {
      return HttpResponse.json({ status: 401, message: '액세스 토큰이 만료되었습니다.' }, { status: 401 });
    }
  }),
  http.post('*', async ({ request }) => {
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
