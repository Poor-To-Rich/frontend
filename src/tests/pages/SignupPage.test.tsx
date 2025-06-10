/**
 * @userStory
 *
 * 사용자는 회원가입 필수요소를 입력해야 회원가입을 할 수 있다.
 * 아이디, 닉네임 중복 검사는 필수이다.
 * 이메일 인증, 인증 코드 확인은 필수이다.
 * 프로필 사진과 직업 정보는 선택 정보이다.
 */

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignupPage from '@/pages/SignupPage/SignupPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('SignupPage', () => {
  beforeEach(() => {
    const queryClient = new QueryClient();

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

  test('초기 상태에서 버튼은 비활성화 되어야 한다', () => {
    const submitButton = screen.getByRole('button', { name: /회원가입/i });

    expect(submitButton).toBeDisabled();
  });

  test('필수 입력 요소 및 검증을 진행 했으면 버튼은 활성화 되어야한다.', async () => {
    // 1. 필수 필드 채우기
    const nameInput = screen.getByLabelText(/이름/i);
    fireEvent.change(nameInput, { target: { value: '홍길동' } });

    const nicknameInput = screen.getByTestId('nickname-input');
    fireEvent.change(nicknameInput, { target: { value: '길동이' } });

    const nicknameButton = screen.getAllByTestId('verify-button')[0];
    fireEvent.click(nicknameButton);

    const usernameInput = screen.getByTestId('username-input');
    fireEvent.change(usernameInput, { target: { value: 'gildong123' } });

    const usernameButton = screen.getAllByTestId('verify-button')[1];
    fireEvent.click(usernameButton);

    const passwordInput = screen.getByTestId('password-input');
    await userEvent.type(passwordInput, 'Password123!');

    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    await userEvent.type(confirmPasswordInput, 'Password123!');

    const birthInput = screen.getByLabelText(/생년월일/i);
    fireEvent.change(birthInput, { target: { value: '1990-01-01' } });

    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'gildong@example.com' } });
    fireEvent.click(screen.getAllByTestId('verify-button')[2]);

    const verifyCodeInput = screen.getByTestId('verification-code-input') as HTMLInputElement;
    fireEvent.change(verifyCodeInput, { target: { value: 654654 } });
    fireEvent.click(screen.getAllByTestId('verify-button')[3]);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /회원가입/i })).toBeEnabled();
    });
  });
});
