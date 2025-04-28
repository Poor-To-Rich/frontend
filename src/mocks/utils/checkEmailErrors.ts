import { SendEmailReq } from '@/types/authTypes';
import { emailPurposeList } from '@/types/authTypes';
import { emailRegex } from '@/utils/regex';
import { HttpResponse } from 'msw';
import { DUPLICATE_EMAIL_MSG, NOT_VALID_PURPOSE, WRONG_EMAIL_MSG } from '@/mocks//constants/email';

export const checkCommonEmailErrors = ({
  email,
  purpose,
}: Pick<SendEmailReq, 'email' | 'purpose'>): Response | null => {
  if (!emailPurposeList.includes(purpose)) {
    return HttpResponse.json({ status: 400, message: NOT_VALID_PURPOSE }, { status: 409 });
  }

  if (!emailRegex.test(email)) {
    return HttpResponse.json({ status: 400, message: WRONG_EMAIL_MSG }, { status: 409 });
  }

  if (email === 'existing@example.com') {
    return HttpResponse.json({ status: 400, message: DUPLICATE_EMAIL_MSG }, { status: 409 });
  }

  if (email === 'retrySending@example.com') {
    return HttpResponse.json(
      { status: 429, message: '인증 코드 재발급 횟수를 초과하였습니다.' },
      {
        status: 429,
      },
    );
  }

  if (email === 'retryVerifying@example.com') {
    return HttpResponse.json(
      { status: 429, message: '인증 요청 횟수를 초과하였습니다.' },
      {
        status: 429,
      },
    );
  }

  if (email === 'blocking@example.com') {
    return HttpResponse.json(
      {
        status: 429,
        message: '인증 요청 횟수를 초과하였습니다. 잠시후에 다시 시도해주세요.',
      },
      { status: 429 },
    );
  }

  return null;
};
