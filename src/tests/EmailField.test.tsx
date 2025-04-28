import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import {
  DUPLICATE_EMAIL_MSG,
  SEND_EMAIL_SUCCESS_MSG,
  TIME_OUT_EMAIL_CODE_MSG,
  VERIFY_CODE_SUCCESS_MSG,
  WRONG_EMAIL_CODE_MSG,
} from '@/mocks/constants/email';
import EmailField from '@/components/input/auth/EmailField';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const methods = useForm({
    defaultValues: { email: '', verificationCode: '' },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FormProvider {...methods}>{children}</FormProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export const sendEmail = () => {
  const email = 'example@naver.com';

  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: email } });

  const button = screen.getByRole('button', { name: /인증/i });
  fireEvent.click(button);
};

describe('EmailField 테스트', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <EmailField />
      </Wrapper>,
    );
  });

  afterEach(() => {
    cleanup(); // 테스트 후 cleanup
  });

  it('유효한 이메일이면 인증 코드 발송 성공 메세지를 보여준다.', async () => {
    sendEmail();

    //Then
    const successMessage = await screen.findByText(content => content.includes(SEND_EMAIL_SUCCESS_MSG));
    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toHaveClass('text-oliveGreen');
  });

  it('중복된 이메일이면 에러 메세지를 보여준다.', async () => {
    const email = 'existing@example.com';

    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: email } });

    const button = screen.getByRole('button', { name: /인증/i });
    fireEvent.click(button);

    //Then
    const errorMessage = await screen.findByText(content => content.includes(DUPLICATE_EMAIL_MSG));
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-sunsetRose');
  });

  it('이메일 인증 코드가 발송 되어야지 인증 코드 입력칸이 활성화 된다.', async () => {
    const verifyCodeInput = screen.getByTestId('verification-code-input') as HTMLInputElement;

    //이메일 인증하지 않은 경우 비활성화
    expect(verifyCodeInput.readOnly).toBe(true);

    sendEmail();

    expect(await screen.findByText(content => content.includes(SEND_EMAIL_SUCCESS_MSG))).toBeInTheDocument();

    expect(verifyCodeInput.readOnly).toBe(false);
  });

  it('인증 된 이메일을 다시 수정하면 인증 코드 입력칸은 비활성화가 된다.', async () => {
    const verifyCodeInput = screen.getByTestId('verification-code-input') as HTMLInputElement;

    sendEmail();

    expect(await screen.findByText(content => content.includes(SEND_EMAIL_SUCCESS_MSG))).toBeInTheDocument();

    // 인증 된 것을 확인
    expect(verifyCodeInput.readOnly).toBe(false);

    // 이메일 변경
    const email = 'test@naver.com';
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: email } });

    // 비활성화 됨.
    expect(verifyCodeInput.readOnly).toBe(true);
  });

  it('올바른 인증 코드를 입력하면 인증 완료 메세지가 나온다.', async () => {
    sendEmail();

    expect(await screen.findByText(content => content.includes(SEND_EMAIL_SUCCESS_MSG))).toBeInTheDocument();

    const verifyCodeInput = screen.getByTestId('verification-code-input') as HTMLInputElement;
    const verifyButton = screen.getByRole('button', { name: /확인/i });

    // 이메일이 인증 된 것을 확인
    expect(verifyCodeInput.readOnly).toBe(false);

    const code = 465652;

    fireEvent.change(verifyCodeInput, { target: { value: code } });
    fireEvent.click(verifyButton);

    // 인증 완료 메세지가 나온다.
    await waitFor(() => {
      expect(screen.getByText(content => content.includes(VERIFY_CODE_SUCCESS_MSG))).toBeInTheDocument();
    });
  });

  it('만료 된 인증 코드를 입력하면 에러 메세지가 나온다.', async () => {
    sendEmail();

    expect(await screen.findByText(content => content.includes(SEND_EMAIL_SUCCESS_MSG))).toBeInTheDocument();

    const verifyCodeInput = screen.getByTestId('verification-code-input') as HTMLInputElement;
    const verifyButton = screen.getByRole('button', { name: /확인/i });

    // 이메일이 인증 된 것을 확인
    expect(verifyCodeInput.readOnly).toBe(false);

    const code = 123456;

    fireEvent.change(verifyCodeInput, { target: { value: code } });
    fireEvent.click(verifyButton);

    // 만료 된 인증 코드 메세지가 나온다.
    const errorMessage = await screen.findByText(content => content.includes(TIME_OUT_EMAIL_CODE_MSG));
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-sunsetRose');
  });

  it('잘못 된 인증 코드를 입력하면 에러 메세지가 나온다.', async () => {
    sendEmail();

    expect(await screen.findByText(content => content.includes(SEND_EMAIL_SUCCESS_MSG))).toBeInTheDocument();

    const verifyCodeInput = screen.getByTestId('verification-code-input') as HTMLInputElement;
    const verifyButton = screen.getByRole('button', { name: /확인/i });

    // 이메일이 인증 된 것을 확인
    expect(verifyCodeInput.readOnly).toBe(false);

    const code = 12345;

    fireEvent.change(verifyCodeInput, { target: { value: code } });
    fireEvent.click(verifyButton);

    // 잘못 된 인증 코드 메세지가 나온다.
    const errorMessage = await screen.findByText(content => content.includes(WRONG_EMAIL_CODE_MSG));
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-sunsetRose');
  });
});
