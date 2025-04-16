import { EmailCodeSendReq } from '@/types/authTypes';
import { emailPurposeList } from '@/types/authTypes';
import { emailRegex } from '@/utils/regex';

export const checkCommonEmailErrors = ({
  email,
  purpose,
}: Pick<EmailCodeSendReq, 'email' | 'purpose'>): Response | null => {
  if (!emailPurposeList.includes(purpose)) {
    return new Response(JSON.stringify({ status: 400, message: '유효하지 않은 인증 목적입니다.' }), { status: 409 });
  }

  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ status: 400, message: '잘못된 이메일 형식입니다.' }), { status: 409 });
  }

  if (email === 'existing@example.com') {
    return new Response(JSON.stringify({ status: 400, message: '이미 사용중인 이메일입니다.' }), { status: 409 });
  }

  if (email === 'retrySending@example.com') {
    return new Response(JSON.stringify({ status: 429, message: '인증 코드 재발급 횟수를 초과하였습니다.' }), {
      status: 429,
    });
  }

  if (email === 'retryVerifying@example.com') {
    return new Response(JSON.stringify({ status: 429, message: '인증 요청 횟수를 초과하였습니다.' }), {
      status: 429,
    });
  }

  if (email === 'blocking@example.com') {
    return new Response(
      JSON.stringify({
        status: 429,
        message: '인증 요청 횟수를 초과하였습니다. 잠시후에 다시 시도해주세요.',
      }),
      { status: 429 },
    );
  }

  return null;
};
