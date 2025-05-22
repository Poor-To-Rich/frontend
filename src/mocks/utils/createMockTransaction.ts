import { format, lastDayOfMonth } from 'date-fns';

export const createRandomAmount = () => {
  return Math.floor(Math.random() * 1000000000000);
};

export const createMockMonthlyTransactions = (date: string) => {
  const result = [];
  const usedDays = new Set();
  const length = Math.floor(Math.random() * 28);

  while (usedDays.size < length) {
    const day = Math.floor(Math.random() * 28) + 1;

    if (usedDays.has(day)) continue;

    usedDays.add(day);

    result.push({
      date: `${date}-${day}`,
      incomesAmount: createRandomAmount(),
      expenseAmount: createRandomAmount(),
    });
  }

  return result;
};

export const createMockYearlySummary = (date: string) => {
  const result = [];

  for (let i = 1; i <= 12; i++) {
    const paddedMonth = String(i).padStart(2, '0');
    const startDate = `${date}-${paddedMonth}-01`;

    const end = lastDayOfMonth(new Date(`${startDate}T00:00:00`));
    const endDate = format(end, 'yyyy-MM-dd');

    const totalIncome = createRandomAmount();
    const totalExpense = createRandomAmount();

    result.push({
      startDate,
      endDate,
      totalIncome,
      totalExpense,
      totalBalance: totalIncome - totalExpense,
    });
  }

  return result;
};
