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
    const dateInput = screen.getByTestId('date-input');

    expect(dateInput).toBeInTheDocument();

    //Then
    await waitFor(() => {
      expect((dateInput as HTMLInputElement).value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('금액 필드는 숫자외의 다른 값을 입력하면 오류메세지가 나타난다.', async () => {
    // Given
    const value = 'asds';

    // When
    const costInput = screen.getByTestId('cost-input');
    act(() => {
      fireEvent.change(costInput, { target: { value: value } });
    });

    // Then
    await waitFor(() => {
      const helperText = screen.getByTestId('cost-input-helper-text');
      expect(helperText).toHaveTextContent('1원 이상의 값을 입력해주세요');
    });
  });

  it('금액에 올바른 숫자를 입력하면 포맷팅이 적용된다', async () => {
    // Given
    const value = 10000;

    const costInput = screen.getByTestId('cost-input');

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
    const expenseButton = screen.getByTestId('expense-toggle-button');
    act(() => fireEvent.click(expenseButton));

    // Then
    await waitFor(() => {
      const expenseMethodSelectBox = screen.getByTestId('expense-method-select');
      expect(expenseMethodSelectBox).toBeInTheDocument();
    });
  });

  it('가계부 타입이 지출이면 지출 관련 카테고리가 나타난다.', async () => {
    // Given

    // When
    const expenseButton = screen.getByTestId('expense-toggle-button');
    act(() => fireEvent.click(expenseButton));

    // Then
    await waitFor(() => {
      const expenseCategoriesSelectBox = screen.getByTestId('expense-categories-select');
      expect(expenseCategoriesSelectBox).toBeInTheDocument();
    });
  });

  it('가계부 타입이 수입이면 지출 수단 SelectBox가 사라진다.', async () => {
    // Given

    // When
    const incomeButton = screen.getByTestId('income-toggle-button');
    act(() => fireEvent.click(incomeButton));

    // Then
    await waitFor(() => {
      const expenseMethodSelectBox = screen.queryByTestId('expense-method-select');
      expect(expenseMethodSelectBox).not.toBeInTheDocument();
    });
  });

  it('가계부 타입이 수입이면 수입 관련 카테고리가 나타난다.', async () => {
    // Given

    // When
    const incomeButton = screen.getByTestId('income-toggle-button');
    act(() => fireEvent.click(incomeButton));

    // Then
    await waitFor(() => {
      const incomeCategoriesSelectBox = screen.getByTestId('income-categories-select');
      expect(incomeCategoriesSelectBox).toBeInTheDocument();
    });
  });
});
