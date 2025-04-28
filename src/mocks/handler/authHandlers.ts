import { endpoints } from '@/api/endpoints';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { koreanOnlyRegex } from '@/utils/regex';
import { delay, http, HttpResponse } from 'msw';
import {
  USERNAME_ERROR_MSG,
  USERNAME_SUCCESS_MSG,
  DUPLICATE_USERNAME,
  DUPLICATE_NICKNAME,
  NICKNAME_ERROR_MSG,
  NICKNAME_SUCCESS_MSG,
  SIGNUP_SUCCESS_MSG,
} from '@/mocks/constants/auth';

export const authHandlers = [
  http.post(endpoints.auth.checkUsernameDuplicate, async ({ request }) => {
    const { username } = await parseRequestBody<{ username: string }>(request);

    if (username === DUPLICATE_USERNAME) {
      return HttpResponse.json({ status: 409, message: USERNAME_ERROR_MSG }, { status: 409 });
    }
    return HttpResponse.json({ status: 200, message: USERNAME_SUCCESS_MSG }, { status: 200 });
  }),
  http.post(endpoints.auth.checkNicknameDuplicate, async ({ request }) => {
    const { nickname } = await parseRequestBody<{ nickname: string }>(request);

    if (nickname === DUPLICATE_NICKNAME) {
      return HttpResponse.json({ status: 409, message: NICKNAME_ERROR_MSG }, { status: 409 });
    }
    return HttpResponse.json({ status: 200, message: NICKNAME_SUCCESS_MSG }, { status: 200 });
  }),
  http.post(endpoints.auth.signup, async ({ request }) => {
    await delay(5000);

    const formData = await request.formData();

    const name = formData.get('name') as string;

    if (!koreanOnlyRegex.test(name)) {
      return HttpResponse.json(
        { status: 400, message: '이름은 한글로만 작성해야 합니다.', data: { field: 'name' } },
        {
          status: 400,
        },
      );
    }

    return HttpResponse.json({ status: 200, message: SIGNUP_SUCCESS_MSG }, { status: 200 });
  }),
];
