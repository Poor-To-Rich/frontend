import { act, cleanup, screen, waitFor, within } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import { renderEditPage } from '../utils/wrapper';
import userEvent from '@testing-library/user-event';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

describe('DeleteTransactionPage', () => {
  afterEach(() => {
    cleanup();
    sessionStorage.clear();
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
