import { act, cleanup, screen, waitFor, within } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import { renderAddPage, renderEditPage } from '../utils/wrapper';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import * as transactionService from '@/api/services/transactionService';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe('AddEditTransactionPage', () => {
  afterEach(() => {
    cleanup(); // 테스트 후 cleanup
    sessionStorage.clear();
  });

  describe('가계부 등록', () => {
    it('필수요소가 모두 입력되어야지 저장 버튼이 활성화 된다.', async () => {
      // Given
      await act(async () => {
        renderAddPage();
      });

      const cost = 12346;
      const category = '선물/경조사';
      const expenseMethod = '현금';

      // When
      const submitButton = await screen.findByTestId('submit-button');
      expect(submitButton).toBeDisabled();

      await userEvent.type(screen.getByTestId('cost-input'), String(cost));
      await userEvent.selectOptions(screen.getByTestId('expense-categories-select'), category);
      await userEvent.selectOptions(screen.getByTestId('expense-method-select'), expenseMethod);

      // Then
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    });

    it('지출 추가의 경우 addExpenseTransaction 호출된다', async () => {
      // Given
      const spy = vi
        .spyOn(transactionService, 'addExpenseTransaction')
        .mockResolvedValue({ status: 200, message: '가계부 등록이 완료되었습니다.' });

      await act(async () => {
        renderAddPage();
      });

      const cost = 12346;
      const category = '선물/경조사';
      const expenseMethod = '현금';

      // When
      await userEvent.type(await screen.findByTestId('cost-input'), String(cost));
      await userEvent.selectOptions(screen.getByTestId('expense-categories-select'), category);
      await userEvent.selectOptions(screen.getByTestId('expense-method-select'), expenseMethod);

      await userEvent.click(screen.getByTestId('repeat-button'));

      const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
      expect(IterationCycleModal).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('daily-button'));

      // Then
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

    it('수입 추가의 경우 paymentMethod 제외하고 addIncomeTransaction 호출된다', async () => {
      // Given
      const spy = vi
        .spyOn(transactionService, 'addIncomeTransaction')
        .mockResolvedValue({ status: 200, message: '가계부 등록이 완료되었습니다.' });

      await act(async () => {
        renderAddPage();
      });

      const transactionType = '지출';
      const cost = 12346;
      const category = '용돈';
      const title = '용돈받음';
      const memo = '야호';

      // When
      await userEvent.type(await screen.findByTestId('income-toggle-button'), transactionType);
      await userEvent.type(screen.getByTestId('cost-input'), String(cost));
      await userEvent.selectOptions(screen.getByTestId('income-categories-select'), category);
      await userEvent.type(screen.getByTestId('income-title-input'), title);
      await userEvent.type(screen.getByTestId('memo-input'), memo);

      await userEvent.click(screen.getByTestId('repeat-button'));

      const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
      expect(IterationCycleModal).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('daily-button'));

      // Then
      await userEvent.click(screen.getByTestId('submit-button'));

      expect(spy).toHaveBeenCalledWith({
        categoryName: category,
        cost: cost,
        title: title,
        memo: memo,
        date: format(new Date(), 'yyyy-MM-dd'),
        iterationType: 'daily',
      });

      spy.mockRestore();
    });
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

  describe('반복 가계부 편집', () => {
    it('내용만 수정한 경우 3가지 선택지 표시된다', async () => {
      // Given
      await act(async () => {
        renderEditPage('1', '지출');
      });

      // When
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

      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);

      // Then
      const IterationCycleModal = await screen.findByTestId('iteration-change-modal');
      expect(IterationCycleModal).toBeInTheDocument();

      const buttons = within(IterationCycleModal).getAllByRole('button');
      expect(buttons[0]).toHaveTextContent('이 반복 내역에만 적용');
      expect(buttons[1]).toHaveTextContent('이후 반복 내역에도 적용');
      expect(buttons[2]).toHaveTextContent('모든 반복 내역에 적용');
      expect(buttons).toHaveLength(3);
    });

    it('반복 설정까지 바꾼 경우 2가지 선택지 표시된다', async () => {
      // Given
      await act(async () => {
        renderEditPage('1', '지출');
      });

      // When
      const costInput = await screen.findByTestId('cost-input');
      const memoInput = await screen.findByTestId('memo-input');
      const dateInput = await screen.findByTestId('date-input');
      const titleInput = await screen.findByTestId('expense-title-input');
      const categorySelectBox = await screen.findByTestId('expense-categories-select');
      const expenseMethodSelectBox = await screen.findByTestId('expense-method-select');

      userEvent.type(dateInput, '2020-05-13');
      userEvent.selectOptions(categorySelectBox, '식비');
      userEvent.type(titleInput, '냉면');
      userEvent.type(costInput, '25,425');
      userEvent.selectOptions(expenseMethodSelectBox, '신용카드');
      userEvent.type(memoInput, '맛있었다');

      await userEvent.click(screen.getByTestId('repeat-button'));

      const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
      expect(IterationCycleModal).toBeInTheDocument();

      const noneButton = screen.getByTestId('none-button');
      await userEvent.click(noneButton);

      const submitButton = screen.getByTestId('submit-button');
      await userEvent.click(submitButton);

      // Then
      const IterationChangeModal = await screen.findByTestId('iteration-change-modal');
      expect(IterationChangeModal).toBeInTheDocument();
      const buttons = within(IterationChangeModal).getAllByRole('button');

      expect(buttons[0]).toHaveTextContent('이후 반복 내역에도 적용');
      expect(buttons[1]).toHaveTextContent('모든 반복 내역에 적용');
      expect(buttons).toHaveLength(2);
    });
  });

  describe('삭제 기능', () => {
    it('삭제 버튼 클릭 시 모달이 뜬다', async () => {
      // Given

      await act(async () => {
        renderEditPage('2', '수입');
      });

      // When
      await waitFor(() => {
        const deleteButton = screen.getByTestId('delete-button');
        userEvent.click(deleteButton);
      });

      //Then
      const deleteModal = await screen.findByTestId('delete-confirm-modal');
      expect(deleteModal).toBeInTheDocument();
    });

    it('반복데이터가 있는 경우 세 가지 옵션이 뜬다', async () => {
      // Given

      await act(async () => {
        renderEditPage('1', '지출');
      });

      // When
      await waitFor(() => {
        const deleteButton = screen.getByTestId('delete-button');
        userEvent.click(deleteButton);
      });

      // Then
      const IterationChangeModal = await screen.findByTestId('iteration-change-modal');
      expect(IterationChangeModal).toBeInTheDocument();
      const buttons = within(IterationChangeModal).getAllByRole('button');

      expect(buttons[0]).toHaveTextContent('이 반복 내역에만 적용');
      expect(buttons[1]).toHaveTextContent('이후 반복 내역에도 적용');
      expect(buttons[2]).toHaveTextContent('모든 반복 내역에 적용');
      expect(buttons).toHaveLength(3);
    });
  });
});
