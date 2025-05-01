export const createRandomAmount = () => {
  return Math.floor(Math.random() * 1000000000000);
};

export const createMockMonthlyTransactions = (date: string) => {
  let result = [];
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
