import { delay, http, HttpResponse } from 'msw';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { endpoints } from '@/api/endpoints';
import { LOGIN_FAIL_MSG, LOGIN_SUCCESS_MSG } from '../constants/login';

export const loginHandlers = [
  http.post(endpoints.auth.login, async ({ request }) => {
    await delay(3000);

    const { username, password } = await parseRequestBody<{ username: string; password: string }>(request);

    if (username === 'woic' && password === 'abcd1234') {
      return HttpResponse.json(
        {
          status: 200,
          message: LOGIN_SUCCESS_MSG,
          data: {
            accessToken: 'accessToken',
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
