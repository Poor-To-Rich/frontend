import { act, cleanup, screen, within } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import { renderEditPage } from '../utils/wrapper';
import userEvent from '@testing-library/user-event';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe('반복 가계부 편집 - 반복 설정까지 수정', () => {
  afterEach(() => {
    cleanup();
    sessionStorage.clear();
  });

  it.skip('반복 설정까지 바꾼 경우 2가지 선택지 표시된다', async () => {
    await act(async () => {
      renderEditPage('1', '지출');
    });

    const costInput = await screen.findByTestId('cost-input');
    const memoInput = await screen.findByTestId('memo-input');
    const categorySelectBox = await screen.findByTestId('expense-categories-select');
    const expenseMethodSelectBox = await screen.findByTestId('expense-method-select');
    const titleInput = await screen.findByTestId('expense-title-input');

    await userEvent.selectOptions(categorySelectBox, '식비');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '냉면');
    await userEvent.clear(costInput);
    await userEvent.type(costInput, '25,425');
    await userEvent.selectOptions(expenseMethodSelectBox, '신용카드');
    await userEvent.clear(memoInput);
    await userEvent.type(memoInput, '맛있었다');

    await userEvent.click(screen.getByTestId('repeat-button'));
    const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
    expect(IterationCycleModal).toBeInTheDocument();

    const noneButton = screen.getByTestId('none-button');
    await userEvent.click(noneButton);

    const submitButton = screen.getByTestId('submit-button');
    await userEvent.click(submitButton);

    const IterationChangeModal = await screen.findByTestId('iteration-change-modal');
    expect(IterationChangeModal).toBeInTheDocument();
    const buttons = within(IterationChangeModal).getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('이후 반복 내역에도 적용');
    expect(buttons[1]).toHaveTextContent('모든 반복 내역에 적용');
    expect(buttons).toHaveLength(2);
  });
});
