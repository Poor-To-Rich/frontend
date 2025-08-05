import { act, cleanup, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAddPage } from '../utils/wrapper';
import { Outlet } from 'react-router-dom';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';

vi.mock('@/components/route/ProtectedRoute', () => ({
  default: () => <Outlet />,
}));

const renderCustomModal = async () => {
  const repeatButton = await screen.findByTestId('repeat-button');
  await userEvent.click(repeatButton);

  const IterationCycleModal = await screen.findByTestId('iteration-cycle-modal');
  expect(IterationCycleModal).toBeInTheDocument();

  const customButton = screen.getByTestId('custom-button');
  await userEvent.click(customButton);

  const CustomIterationModal = await screen.findByTestId('custom-iteration-modal');
  expect(CustomIterationModal).toBeInTheDocument();
};

describe.skip('CustomIterationModal', () => {
  beforeEach(async () => {
    await act(async () => {
      renderAddPage();
    });
  });

  afterEach(() => {
    sessionStorage.clear();
    cleanup();
  });

  it('IterationCycleModal에서 사용자화를 클릭하면 CustomIterationModal이 렌더링 된다.', () => {
    renderCustomModal();
  });

  it('기본 CustomIterationModal의 선택된 type은 daily이다.', async () => {
    await renderCustomModal();

    const dailyTypeButton = screen.getByTestId('daily-type-button');
    expect(dailyTypeButton).toHaveClass('bg-pastelLime');
  });

  it('type이 weekly이면 DayOfWeekSelector 컴포넌트가 렌더링 된다', async () => {
    await renderCustomModal();

    const weeklyTypeButton = screen.getByTestId('weekly-type-button');
    userEvent.click(weeklyTypeButton);

    await waitFor(() => {
      expect(weeklyTypeButton).toHaveClass('bg-pastelLime');
    });

    const DayOfWeekSelector = await screen.findByTestId('day-of-week-selector');
    expect(DayOfWeekSelector).toBeInTheDocument();
  });

  it('type이 monthly이면 MonthlyOptionSelector 컴포넌트가 렌더링 된다', async () => {
    await renderCustomModal();

    const monthlyTypeButton = screen.getByTestId('monthly-type-button');
    userEvent.click(monthlyTypeButton);

    await waitFor(() => {
      expect(monthlyTypeButton).toHaveClass('bg-pastelLime');
    });

    const MonthlyOptionSelector = await screen.findByTestId('monthly-option-selector');
    expect(MonthlyOptionSelector).toBeInTheDocument();
  });

  it('5월 13일을 선택하면 "매월 13일"과 "매월 둘째주 화요일"이 표시된다', async () => {
    const { result } = renderHook(() => useCalenderDateStore());

    const newDate = new Date('2025-05-13');

    act(() => {
      result.current.setCalenderDate(newDate);
    });

    await renderCustomModal();

    const monthlyTypeButton = screen.getByTestId('monthly-type-button');
    userEvent.click(monthlyTypeButton);

    await waitFor(() => {
      expect(monthlyTypeButton).toHaveClass('bg-pastelLime');
    });

    const MonthlyOptionSelector = await screen.findByTestId('monthly-option-selector');
    expect(MonthlyOptionSelector).toBeInTheDocument();

    const dayOfMonthOption = await screen.findByTestId('dayOfMonth');
    const weekdayOfMonthOption = await screen.findByTestId('weekdayOfMonth');
    expect(dayOfMonthOption).toHaveTextContent('매월 13일');
    expect(weekdayOfMonthOption).toHaveTextContent('매월 둘째주 화요일');
  });

  it('5월 27일을 선택하면 monthlyOption에 "매월 27일"과 "매월 마지막 주 화요일"이 표시된다', async () => {
    const { result } = renderHook(() => useCalenderDateStore());

    const newDate = new Date('2025-05-27');

    act(() => {
      result.current.setCalenderDate(newDate);
    });

    await renderCustomModal();

    const monthlyTypeButton = screen.getByTestId('monthly-type-button');
    userEvent.click(monthlyTypeButton);

    await waitFor(() => {
      expect(monthlyTypeButton).toHaveClass('bg-pastelLime');
    });

    const MonthlyOptionSelector = await screen.findByTestId('monthly-option-selector');
    expect(MonthlyOptionSelector).toBeInTheDocument();

    const dayOfMonthOption = await screen.findByTestId('dayOfMonth');
    const weekdayOfMonthOption = await screen.findByTestId('weekdayOfMonth');
    expect(dayOfMonthOption).toHaveTextContent('매월 27일');
    expect(weekdayOfMonthOption).toHaveTextContent('매월 마지막주 화요일');
  });

  it('선택된 날짜가 말일이 아니면 MonthlyOptionSelector에 매달 말일 선택지는 보이지않는다.', async () => {
    const { result } = renderHook(() => useCalenderDateStore());

    const newDate = new Date('2025-01-01');

    act(() => {
      result.current.setCalenderDate(newDate);
    });

    await renderCustomModal();

    const monthlyTypeButton = screen.getByTestId('monthly-type-button');
    userEvent.click(monthlyTypeButton);

    await waitFor(() => {
      expect(monthlyTypeButton).toHaveClass('bg-pastelLime');
    });

    const MonthlyOptionSelector = await screen.findByTestId('monthly-option-selector');
    expect(MonthlyOptionSelector).toBeInTheDocument();

    const endOfMonthOption = screen.queryByTestId('endOfMonth');
    expect(endOfMonthOption).not.toBeInTheDocument();
  });

  it('선택된 날짜가 말일이면 MonthlyOptionSelector에 매달 말일 선택지가 추가된다.', async () => {
    const { result } = renderHook(() => useCalenderDateStore());

    const newDate = new Date('2025-06-30');

    act(() => {
      result.current.setCalenderDate(newDate);
    });

    await renderCustomModal();

    const monthlyTypeButton = screen.getByTestId('monthly-type-button');
    userEvent.click(monthlyTypeButton);

    await waitFor(() => {
      expect(monthlyTypeButton).toHaveClass('bg-pastelLime');
    });

    const MonthlyOptionSelector = await screen.findByTestId('monthly-option-selector');
    expect(MonthlyOptionSelector).toBeInTheDocument();

    const endOfMonthOption = screen.getByTestId('endOfMonth');
    expect(endOfMonthOption).toBeInTheDocument();
  });
});
