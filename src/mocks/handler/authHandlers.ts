import { endpoints } from '@/api/endpoints';
import { parseRequestBody } from '@/mocks/utils/parseRequestBody';
import { koreanOnlyRegex } from '@/utils/regex';
import { delay, http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post(endpoints.auth.checkUsernameDuplicate, async ({ request }) => {
    const { username } = await parseRequestBody<{ username: string }>(request);

    if (username === 'woic') {
      return HttpResponse.json({ status: 409, message: '중복된 아이디입니다.' }, { status: 409 });
    }
    return HttpResponse.json({ status: 200, message: '사용할 수 있는 아이디입니다.' }, { status: 200 });
  }),
  http.post(endpoints.auth.checkNicknameDuplicate, async ({ request }) => {
    const { nickname } = await parseRequestBody<{ nickname: string }>(request);

    if (nickname === '데굴') {
      return HttpResponse.json({ status: 409, message: '중복된 닉네임입니다.' }, { status: 409 });
    }
    return HttpResponse.json({ status: 200, message: '사용할 수 있는 닉네임입니다.' }, { status: 200 });
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

    return HttpResponse.json({ status: 200, message: '회원 가입 성공' }, { status: 200 });
  }),
];
