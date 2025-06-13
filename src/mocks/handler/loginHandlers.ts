import { http, HttpResponse } from 'msw';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { endpoints } from '@/api/endpoints';
import { LOGIN_FAIL_MSG, LOGIN_SUCCESS_MSG } from '@/mocks/constants/login';
import Cookies from 'js-cookie';
import { createMockAccessToken, createMockRefreshToken } from '@/mocks/utils/createMockToken';

export const loginHandlers = [
  http.post(endpoints.auth.login, async ({ request }) => {
    const { username, password } = await parseRequestBody<{ username: string; password: string }>(request);

    if (username === 'woic' && password === 'abcd1234') {
      Cookies.set('refreshToken', createMockRefreshToken(), { expires: 7 });

      return HttpResponse.json(
        {
          status: 200,
          message: LOGIN_SUCCESS_MSG,
          data: {
            accessToken: createMockAccessToken(),
          },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        status: 400,
        message: LOGIN_FAIL_MSG,
      },
      { status: 400 },
    );
  }),
];
