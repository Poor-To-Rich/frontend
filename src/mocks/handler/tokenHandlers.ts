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
];
