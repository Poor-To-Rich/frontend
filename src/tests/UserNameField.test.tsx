import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import UsernameField from '@/components/input/auth/UsernameField';
import { FormProvider, useForm } from 'react-hook-form';
import { DUPLICATE_USERNAME, USERNAME_ERROR_MSG, USERNAME_SUCCESS_MSG } from '@/mocks/constants/auth';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const methods = useForm();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FormProvider {...methods}>{children}</FormProvider>{' '}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('UsernameField', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <UsernameField />
      </Wrapper>,
    );

    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('아이디 입력 후 중복검사를 통과하면 성공 메시지가 보인다.', async () => {
    const username = 'newUsername';

    // 1. 아이디 입력
    const input = screen.getByRole('textbox', { name: /아이디/i });
    fireEvent.change(input, { target: { value: username } });

    // 2. 중복 확인 버튼 클릭
    const button = screen.getByRole('button', { name: /중복확인/i });
    fireEvent.click(button);

    expect(await screen.findByText(USERNAME_SUCCESS_MSG)).toBeInTheDocument();
  });

  it('아이디 입력 후 중복검사 결과 중복된 아이디인 경우 에러 메시지가 보인다.', async () => {
    const username = DUPLICATE_USERNAME;

    // 1. 중복된 아이디 입력
    const input = screen.getByRole('textbox', { name: /아이디/i });
    fireEvent.change(input, { target: { value: username } });

    // 2. 중복 확인 버튼 클릭
    const button = screen.getByRole('button', { name: /중복확인/i });
    fireEvent.click(button);

    // 3. 중복된 아이디입니다. 라는 멘트가 나오는지 확인
    expect(await screen.findByText(USERNAME_ERROR_MSG)).toBeInTheDocument();
  });
});
