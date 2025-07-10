// AddTransaction.test.tsx
import { act, cleanup, screen, waitFor } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import { renderAddPage } from '../utils/wrapper';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import * as transactionService from '@/api/services/transactionService';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe('AddTransactionPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
    sessionStorage.clear();
  });

  it('필수요소가 모두 입력되어야 저장 버튼이 활성화된다', async () => {
    await act(async () => {
      renderAddPage();
    });

    const cost = 12346;
    const category = '선물/경조사';
    const expenseMethod = '현금';

    const submitButton = await screen.findByTestId('submit-button');
    expect(submitButton).toBeDisabled();

    await userEvent.type(screen.getByTestId('cost-input'), String(cost));
    await userEvent.selectOptions(screen.getByTestId('expense-categories-select'), category);
    await userEvent.selectOptions(screen.getByTestId('expense-method-select'), expenseMethod);

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it('지출 추가의 경우 addExpenseTransaction 호출된다', async () => {
    const spy = vi
      .spyOn(transactionService, 'addExpenseTransaction')
      .mockResolvedValue({ status: 200, message: '가계부 등록이 완료되었습니다.' });

    await act(async () => {
      renderAddPage();
    });

    const cost = 12346;
    const category = '선물/경조사';
    const expenseMethod = '현금';

    await userEvent.type(await screen.findByTestId('cost-input'), String(cost));
    await userEvent.selectOptions(screen.getByTestId('expense-categories-select'), category);
    await userEvent.selectOptions(screen.getByTestId('expense-method-select'), expenseMethod);
    await userEvent.click(screen.getByTestId('repeat-button'));

    const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
    expect(IterationCycleModal).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('daily-button'));
    await userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        categoryName: '선물/경조사',
        cost: cost,
        date: format(new Date(), 'yyyy-MM-dd'),
        iterationType: 'daily',
        paymentMethod: '현금',
      });
    });

    spy.mockRestore();
  });
});
