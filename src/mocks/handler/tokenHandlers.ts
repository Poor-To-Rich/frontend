import { endpoints } from '@/api/endpoints';
import Cookies from 'js-cookie';
import { http, HttpResponse } from 'msw';
import { CREATE_TOKEN_SUCCESS_MSG, TOKEN_ERROR_MSG } from '@/mocks/constants/login';
import { isTokenValid } from '@/mocks/utils/checkTokenValid';
import { createMockAccessToken, createMockRefreshToken } from '@/mocks/utils/createMockToken';

export const tokenHandlers = [
  http.post(endpoints.auth.refreshToken, async () => {
    const token = Cookies.get('refreshToken');

    if (!token || !isTokenValid(token)) {
      return HttpResponse.json(
        {
          status: 401,
          message: TOKEN_ERROR_MSG,
        },
        { status: 401 },
      );
    }

    Cookies.set('refreshToken', createMockRefreshToken(), { expires: 7 });

    return HttpResponse.json(
      {
        status: 200,
        message: CREATE_TOKEN_SUCCESS_MSG,
        data: {
          accessToken: createMockAccessToken(),
        },
      },
      { status: 200 },
    );
  }),
  http.get(endpoints.email.sendEmail, async ({ request }) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!isTokenValid(token)) {
      return HttpResponse.json({ status: 401, message: '액세스 토큰이 만료되었습니다.' }, { status: 401 });
    }
  }),
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
