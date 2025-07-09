import { act, cleanup, screen, waitFor } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import { renderEditPage } from '../utils/wrapper';
import userEvent from '@testing-library/user-event';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe('EditTransactionPage', () => {
  afterEach(() => {
    cleanup();
    sessionStorage.clear();
  });

  describe('가계부 편집', () => {
    it('기존 데이터를 렌더링 시 볼 수 있다', async () => {
      // Given

      await act(async () => {
        renderEditPage('1', '지출');
      });

      const cost = '30,000';
      const date = '2025-02-09';
      const category = '주거비';
      const title = '월세';
      const method = '계좌이체';
      const memo = '이응';
      const days = ['월', '금'];

      // Then
      await waitFor(() => {
        const costInput = screen.getByTestId('cost-input');
        const memoInput = screen.getByTestId('memo-input');
        const dateInput = screen.getByTestId('date-input');
        const titleInput = screen.getByTestId('expense-title-input');
        const categorySelectBox = screen.getByTestId('expense-categories-select');
        const expenseMethodSelectBox = screen.getByTestId('expense-method-select');

        expect(dateInput).toHaveValue(date);
        expect(categorySelectBox).toHaveValue(category);
        expect(titleInput).toHaveValue(title);
        expect(costInput).toHaveValue(cost);
        expect(expenseMethodSelectBox).toHaveValue(method);
        expect(memoInput).toHaveValue(memo);
      });

      await userEvent.click(screen.getByTestId('repeat-button'));

      const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
      expect(IterationCycleModal).toBeInTheDocument();

      const customButton = screen.getByTestId('custom-button');
      const checkIcon = customButton.querySelector('svg[data-testid="check-icon"]');
      expect(checkIcon).toBeInTheDocument();

      await userEvent.click(customButton);

      const weeklyTypeButton = screen.getByTestId('weekly-type-button');
      expect(weeklyTypeButton).toHaveClass('bg-pastelLime');

      const DayOfWeekSelector = screen.getByTestId('day-of-week-selector');
      const buttons = DayOfWeekSelector.querySelectorAll('button');

      const activeButton = Array.from(buttons).find(btn => btn.textContent && days.includes(btn.textContent));
      expect(activeButton).toHaveClass('bg-pastelLime');
    });
  });
});
