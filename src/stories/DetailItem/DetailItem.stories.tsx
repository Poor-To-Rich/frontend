import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import { TransactionType } from '@/types/transactionTypes';
import type { Meta, StoryObj } from '@storybook/react';

function DetailItem() {
  const expenseItem = {
    id: 1,
    color: '#ff55ad',
    date: '2025-01-02',
    categoryName: '식비',
    title: '상하이버거세트',
    isIteration: true,
    type: 'EXPENSE' as TransactionType,
    cost: 45626546888,
  };

  const incomeItem = {
    id: 1,
    color: '#9ADEF1',
    date: '2025-01-02',
    categoryName: '용돈',
    title: '용돈이지롱',
    isIteration: false,
    type: 'INCOME' as TransactionType,
    cost: 12678689,
  };
  return (
    <div className="">
      <TransactionDetailItem {...expenseItem} />
      <TransactionDetailItem {...incomeItem} />
    </div>
  );
}

const meta = {
  component: DetailItem,
} satisfies Meta<typeof DetailItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
