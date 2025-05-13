import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import NicknameField from '@/components/input/auth/NicknameField';
import { FormProvider, useForm } from 'react-hook-form';
import { DUPLICATE_NICKNAME, NICKNAME_ERROR_MSG, NICKNAME_SUCCESS_MSG } from '@/mocks/constants/auth';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const methods = useForm();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FormProvider {...methods}>{children}</FormProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('NicknameField', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <NicknameField />
      </Wrapper>,
    );

    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('닉네임 입력 후 중복검사를 통과하면 성공 메시지가 보인다.', async () => {
    // Given
    const nickname = 'newNickname';

    //When
    // 1. 닉네임 입력
    const input = screen.getByRole('textbox', { name: /닉네임/i });
    fireEvent.change(input, { target: { value: nickname } });

    // 2. 중복 확인 버튼 클릭
    const button = screen.getByRole('button', { name: /중복확인/i });
    fireEvent.click(button);

    expect(await screen.findByText(NICKNAME_SUCCESS_MSG)).toBeInTheDocument();
  });

  it('닉네임 입력 후 중복검사 결과 중복된 닉네임인 경우 에러 메시지가 보인다.', async () => {
    const nickname = DUPLICATE_NICKNAME;

    // 1. 중복된 닉네임 입력
    const input = screen.getByRole('textbox', { name: /닉네임/i });
    fireEvent.change(input, { target: { value: nickname } });

    // 2. 중복 확인 버튼 클릭
    const button = screen.getByRole('button', { name: /중복확인/i });
    fireEvent.click(button);

    // 3. 중복된 닉네임입니다. 라는 멘트가 나오는지 확인
    expect(await screen.findByText(NICKNAME_ERROR_MSG)).toBeInTheDocument();
  });
});
