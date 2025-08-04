import { cleanup, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { renderAddPage } from '../utils/wrapper';
import { Outlet } from 'react-router-dom';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe.skip('TransactionFields', () => {
  beforeEach(() => {
    renderAddPage();
  });

  afterEach(() => {
    cleanup();
  });

  it('페이지 진입 시 날짜 필드의 값은 사용자가 선택한 날짜로 세팅되어야한다.', async () => {
    await waitFor(() => {
      const dateInput = screen.getByTestId('date-input');
      expect(dateInput).toBeInTheDocument();
      expect((dateInput as HTMLInputElement).value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('금액에 올바른 숫자를 입력하면 포맷팅이 적용된다', async () => {
    const value = 10000;
    const costInput = await screen.findByTestId('cost-input');

    await act(async () => {
      fireEvent.change(costInput, { target: { value } });
    });

    await waitFor(() => {
      expect((costInput as HTMLInputElement).value).toBe('10,000');
    });
  });

  it('가계부 타입이 지출이면 지출 수단 SelectBox가 나타난다.', async () => {
    const expenseButton = await screen.findByTestId('expense-toggle-button');
    await act(async () => {
      fireEvent.click(expenseButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('expense-method-select')).toBeInTheDocument();
    });
  });

  it('가계부 타입이 지출이면 지출 관련 카테고리가 나타난다.', async () => {
    const expenseButton = await screen.findByTestId('expense-toggle-button');
    await act(async () => {
      fireEvent.click(expenseButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('expense-categories-select')).toBeInTheDocument();
    });
  });

  it('가계부 타입이 수입이면 지출 수단 SelectBox가 사라진다.', async () => {
    const incomeButton = await screen.findByTestId('income-toggle-button');
    await act(async () => {
      fireEvent.click(incomeButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('expense-method-select')).not.toBeInTheDocument();
    });
  });

  it('가계부 타입이 수입이면 수입 관련 카테고리가 나타난다.', async () => {
    const incomeButton = await screen.findByTestId('income-toggle-button');
    await act(async () => {
      fireEvent.click(incomeButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('income-categories-select')).toBeInTheDocument();
    });
  });
});
