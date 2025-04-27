/**
 * @userStory
 *
 * 사용자는 회원가입 필수요소를 입력해야 회원가입을 할 수 있다.
 * 아이디, 닉네임 중복 검사는 필수이다.
 * 이메일 인증, 인증 코드 확인은 필수이다.
 * 프로필 사진과 직업 정보는 선택 정보이다.
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SignupPage from '@/pages/SignupPage/SignupPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('SignupPage', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SignupPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('초기 상태에서 버튼은 비활성화 되어야 한다', () => {
    const submitButton = screen.getByRole('button', { name: /회원가입/i });

    expect(submitButton).toBeDisabled();
  });

  it('회원가입 필수 요소를 모두 입력해야 회원가입 버튼이 활성화 된다.', () => {});
});
