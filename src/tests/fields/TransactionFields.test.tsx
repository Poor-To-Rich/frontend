import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderAddPage } from '../utils/wrapper';
import { Outlet } from 'react-router-dom';
import { act } from 'react';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe('TransactionFields', () => {
  beforeEach(() => {
    renderAddPage();
  });

  afterEach(() => {
    cleanup(); // 테스트 후 cleanup
  });

  it('페이지 진입 시 날짜 필드의 값은 사용자가 선택한 날짜로 세팅되어야한다.', async () => {
    //When

    await waitFor(() => {
      const dateInput = screen.getByTestId('date-input');

      expect(dateInput).toBeInTheDocument();

      expect((dateInput as HTMLInputElement).value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('금액에 올바른 숫자를 입력하면 포맷팅이 적용된다', async () => {
    // Given
    const value = 10000;

    const costInput = await screen.findByTestId('cost-input');

    act(() => {
      fireEvent.change(costInput, { target: { value: value } });
    });

    await waitFor(() => {
      expect((costInput as HTMLInputElement).value).toBe('10,000');
    });
  });

  it('가계부 타입이 지출이면 지출 수단 SelectBox가 나타난다.', async () => {
    // Given

    // When
    await waitFor(() => {
      const expenseButton = screen.getByTestId('expense-toggle-button');
      act(() => fireEvent.click(expenseButton));
    });

    // Then
    await waitFor(() => {
      const expenseMethodSelectBox = screen.getByTestId('expense-method-select');
      expect(expenseMethodSelectBox).toBeInTheDocument();
    });
  });

  it('가계부 타입이 지출이면 지출 관련 카테고리가 나타난다.', async () => {
    // Given

    // When
    await waitFor(() => {
      const expenseButton = screen.getByTestId('expense-toggle-button');
      act(() => fireEvent.click(expenseButton));
    });

    // Then
    await waitFor(() => {
      const expenseCategoriesSelectBox = screen.getByTestId('expense-categories-select');
      expect(expenseCategoriesSelectBox).toBeInTheDocument();
    });
  });

  it('가계부 타입이 수입이면 지출 수단 SelectBox가 사라진다.', async () => {
    // Given

    // When
    await waitFor(() => {
      const incomeButton = screen.getByTestId('income-toggle-button');
      act(() => fireEvent.click(incomeButton));
    });

    // Then
    await waitFor(() => {
      const expenseMethodSelectBox = screen.queryByTestId('expense-method-select');
      expect(expenseMethodSelectBox).not.toBeInTheDocument();
    });
  });

  it('가계부 타입이 수입이면 수입 관련 카테고리가 나타난다.', async () => {
    // Given

    // When
    await waitFor(() => {
      const incomeButton = screen.getByTestId('income-toggle-button');
      act(() => fireEvent.click(incomeButton));
    });

    // Then
    await waitFor(() => {
      const incomeCategoriesSelectBox = screen.getByTestId('income-categories-select');
      expect(incomeCategoriesSelectBox).toBeInTheDocument();
    });
  });
});
